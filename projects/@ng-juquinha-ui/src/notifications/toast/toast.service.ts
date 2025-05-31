import { Injectable, signal } from "@angular/core"
import type { ToastMessage } from "./toast.model"

interface TimerInfo {
  messageId: number
  remainingTime: number
  startTime: number
  timeoutId?: any
  isPaused: boolean
}

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private messagesSignal = signal<ToastMessage[]>([])
  private timers = new Map<number, TimerInfo>()

  readonly messages = this.messagesSignal.asReadonly()

  private readonly DEFAULT_TOAST_DURATION = 5000
  private readonly MAX_RANDOM_ID = 9999

  add(message: ToastMessage) {
    const newMessage = {
      ...message,
      id: this.generateUniqueId(),
      time: message.time ?? this.DEFAULT_TOAST_DURATION,
    }

    this.messagesSignal.update(messages => [...messages, newMessage])

    if (newMessage.time > 0 && newMessage.id) {
      this.startTimer(newMessage.id, newMessage.time)
    }

    return newMessage.id
  }

  removeById(messageId: number) {
    // Remove o timer se existir
    this.clearTimer(messageId)

    this.messagesSignal.update(messages =>
      messages.filter(message => message.id !== messageId)
    )
  }

  clear() {
    // Limpa todos os timers
    this.timers.forEach((_, messageId) => this.clearTimer(messageId))
    this.messagesSignal.set([])
  }

  update(messageId: number, updates: Partial<ToastMessage>) {
    this.messagesSignal.update(messages =>
      messages.map(message =>
        message.id === messageId ? { ...message, ...updates } : message
      )
    )

    if (updates.time && updates.time > 0) {
      this.clearTimer(messageId)
      this.startTimer(messageId, updates.time)
    }
  }

  // Métodos para controle de pausa
  pauseTimer(messageId: number) {
    const timer = this.timers.get(messageId)
    if (timer && !timer.isPaused && timer.timeoutId) {
      // Calcula o tempo restante
      const elapsed = Date.now() - timer.startTime
      timer.remainingTime = Math.max(0, timer.remainingTime - elapsed)

      // Limpa o timeout atual
      clearTimeout(timer.timeoutId)
      timer.timeoutId = undefined
      timer.isPaused = true

      console.log(
        `Timer pausado para mensagem ${messageId}. Tempo restante: ${timer.remainingTime}ms`
      )
    }
  }

  resumeTimer(messageId: number) {
    const timer = this.timers.get(messageId)
    if (timer && timer.isPaused && timer.remainingTime > 0) {
      timer.isPaused = false
      timer.startTime = Date.now()

      timer.timeoutId = setTimeout(() => {
        this.removeById(messageId)
      }, timer.remainingTime)
    }
  }

  private startTimer(messageId: number, duration: number) {
    const timer: TimerInfo = {
      messageId,
      remainingTime: duration,
      startTime: Date.now(),
      isPaused: false,
    }

    timer.timeoutId = setTimeout(() => {
      this.removeById(messageId)
    }, duration)

    this.timers.set(messageId, timer)
  }

  private clearTimer(messageId: number) {
    const timer = this.timers.get(messageId)
    if (timer) {
      if (timer.timeoutId) {
        clearTimeout(timer.timeoutId)
      }
      this.timers.delete(messageId)
    }
  }

  private generateUniqueId() {
    const existingIds = new Set(this.messagesSignal().map(m => m.id))

    let randomId: number
    do {
      randomId = Math.floor(Math.random() * this.MAX_RANDOM_ID)
    } while (existingIds.has(randomId))

    return randomId
  }

  // Método para debug - verificar estado dos timers
  getTimerInfo(messageId: number): TimerInfo | undefined {
    return this.timers.get(messageId)
  }

  // Método para verificar se um timer está pausado
  isTimerPaused(messageId: number): boolean {
    const timer = this.timers.get(messageId)
    return timer?.isPaused ?? false
  }
}
