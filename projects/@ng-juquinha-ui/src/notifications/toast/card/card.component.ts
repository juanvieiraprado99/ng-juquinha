import { NgClass } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from "@angular/core"
import { Router } from "@angular/router"
import { IconComponent } from "../../../icons/icon/icon.component"
import type { ToastMessage } from "../toast.model"
import { ToastService } from "../toast.service"
import type { severity } from "../toast.types"

@Component({
  selector: "juquinha-card",
  standalone: true,
  imports: [NgClass, IconComponent],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  private readonly router = inject(Router)
  private readonly toastService = inject(ToastService)
  private intervalId: any

  message = input.required<ToastMessage>()

  onClick = output<number>()
  onClose = output<number>()

  progress = signal(100)
  isPaused = signal(false)

  toastClass = computed(() => `severity-${this.message().severity}`)
  icon = computed(() => {
    const icons = {
      success: "check-filled",
      error: "warning-circle-filled",
      warn: "warning-triangle-filled",
      info: "information-circle-filled",
      default: "information-circle-filled",
      loading: "loader",
    }
    const severity = this.message().severity as severity
    return icons[severity]
  })

  constructor() {
    effect(
      () => {
        const msg = this.message()
        if (msg && msg.time && msg.time > 0) {
          this.startProgressTimer(msg.time)
        }
      },
      { allowSignalWrites: true }
    )
  }

  private startProgressTimer(durationMs: number) {
    this.progress.set(100)
    this.clearTimer()

    const interval = 50
    const decrement = (100 / durationMs) * interval

    this.intervalId = setInterval(() => {
      if (!this.isPaused()) {
        const currentProgress = this.progress()
        if (currentProgress <= 0) {
          this.clearTimer()
          return
        }
        this.progress.set(Math.max(0, currentProgress - decrement))
      }
    }, interval)
  }

  private clearTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  onMouseEnter() {
    this.isPaused.set(true)

    const messageId = this.message().id
    if (messageId) {
      this.toastService.pauseTimer(messageId)
    }
  }

  onMouseLeave() {
    this.isPaused.set(false)

    const messageId = this.message().id
    if (messageId) {
      this.toastService.resumeTimer(messageId)
    }
  }

  navigateToLink(event: Event) {
    event.preventDefault()

    if (this.message().externalLink) {
      window.open(this.message().link, "_blank")
      return
    }

    this.router.navigate([this.message().link])
  }

  handleClickClose() {
    this.clearTimer()
    this.onClose.emit(this.message().id!)
  }

  handleClick() {
    this.onClick.emit(this.message().id!)
  }

  ngOnDestroy() {
    this.clearTimer()
  }
}
