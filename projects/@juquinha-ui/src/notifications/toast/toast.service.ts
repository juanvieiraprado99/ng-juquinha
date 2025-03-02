import { Injectable, signal } from "@angular/core"
import type { ToastMessage } from "./toast.model"

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private messagesSignal = signal<ToastMessage[]>([])

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
      setTimeout(() => this.removeById(newMessage.id), newMessage.time)
    }

    return newMessage.id
  }

  removeById(messageId: number) {
    this.messagesSignal.update(messages =>
      messages.filter(message => message.id !== messageId)
    )
  }

  clear() {
    this.messagesSignal.set([])
  }

  update(messageId: number, updates: Partial<ToastMessage>) {
    this.messagesSignal.update(messages =>
      messages.map(message =>
        message.id === messageId ? { ...message, ...updates } : message
      )
    )

    if (updates.time && updates.time > 0) {
      setTimeout(() => this.removeById(messageId), updates.time)
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
}
