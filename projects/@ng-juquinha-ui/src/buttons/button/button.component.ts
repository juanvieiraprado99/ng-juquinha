import { NgClass } from "@angular/common"
import { Component, computed, inject, input, output } from "@angular/core"
import { IconComponent } from "../../icons/icon/icon.component"
import { ConfirmPopupComponent } from "../../overlays/confirm-popup/confirm-popup.component"
import { ConfirmationService } from "../../overlays/confirm-popup/confirmation.service"
import type { size, theme, type, variant } from "./button.types"

@Component({
  selector: "juquinha-button",
  standalone: true,
  imports: [NgClass, IconComponent, ConfirmPopupComponent],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.scss",
})
export class ButtonComponent {
  private readonly confirmationService = inject(ConfirmationService)

  label = input<string>()
  for = input<string>()
  type = input<type>("submit")
  variant = input<variant>("primary")
  theme = input<theme>("default")
  size = input<size>("large")
  iconSize = input("18")
  iconLeft = input<string>()
  iconRight = input<string>()
  fullWidth = input(false)
  disabled = input(false)
  loading = input(false)
  ariaLabel = input<string>()
  confirmPopup = input(false)
  confirmMessage = input("Você deseja realmente realizar essa ação?")

  onClick = output()
  onAccept = output()
  onReject = output()

  buttonClass = computed(() => {
    const classesToAdd = [
      `variant-${this.variant()}`,
      `theme-${this.theme()}`,
      `size-${this.size()}`,
    ]
    if (this.fullWidth()) classesToAdd.push("fullWidth")
    return classesToAdd.join(" ")
  })

  iconColor = computed(() => {
    const style = getComputedStyle(document.body)

    if (this.disabled()) {
      return style.getPropertyValue("--juquinha-button-disabled-text-color")
    }

    if (this.variant() === "primary") {
      if (this.theme() === "light") {
        return style.getPropertyValue("--juquinha-primary-color")
      }
      if (this.theme() === "neutral") {
        return style.getPropertyValue("--juquinha-neutral-color-900")
      }
      return style.getPropertyValue("--juquinha-button-icon-color")
    }

    if (this.theme() === "error") {
      return style.getPropertyValue(
        "--juquinha-button-error-icon-color-in-light"
      )
    }
    return style.getPropertyValue("--juquinha-button-icon-color-in-light")
  })

  handleClick(event: Event) {
    this.onClick.emit()

    if (!this.confirmPopup()) return

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.confirmMessage(),
      accept: () => this.onAccept.emit(),
      reject: () => this.onReject.emit(),
    })
  }
}
