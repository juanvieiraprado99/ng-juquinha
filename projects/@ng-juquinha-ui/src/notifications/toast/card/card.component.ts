import { NgClass } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from "@angular/core"
import { Router } from "@angular/router"
import { IconComponent } from "../../../icons/icon/icon.component"
import type { ToastMessage } from "../toast.model"
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

  message = input.required<ToastMessage>()

  onClick = output<number>()
  onClose = output<number>()

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

  navigateToLink(event: Event) {
    event.preventDefault()

    if (this.message().externalLink) {
      window.open(this.message().link, "_blank")
      return
    }

    this.router.navigate([this.message().link])
  }

  handleClickClose() {
    this.onClose.emit(this.message().id!)
  }

  handleClick() {
    this.onClick.emit(this.message().id!)
  }
}
