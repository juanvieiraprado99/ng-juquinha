import { NgClass } from "@angular/common"
import {
  Component,
  HostListener,
  computed,
  input,
  model,
  output,
} from "@angular/core"
import { FormsModule } from "@angular/forms"
import { ButtonComponent } from "../../buttons/button/button.component"
import { DividerComponent } from "../../dividers/divider/divider.component"
import { LabelComponent } from "../../forms/label/label.component"
import { IconComponent } from "../../icons/icon/icon.component"
import type { footerMode, size } from "./modal.types"

@Component({
  selector: "juquinha-modal",
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    ButtonComponent,
    DividerComponent,
    IconComponent,
    LabelComponent,
  ],
  templateUrl: "./modal.component.html",
  styleUrl: "./modal.component.scss",
})
export class ModalComponent {
  show = input(false)
  size = input<size>("medium")
  showClose = input(true)
  headerIcon = input<string>()
  headerIconColor = input("var(--juquinha-primary-color)")
  title = input<string>()
  subtitle = input<string>()
  showDivider = input(true)
  confirmButtonLabel = input("Confirmar")
  cancelButtonLabel = input("Cancelar")
  footerText = input<string>()
  footerLink = input<string>()
  preventEscapeKey = input(false)
  loading = input(false)
  footerMode = input<footerMode>("none")

  onCloseModal = output<void>()
  onClickConfirm = output<void>()
  onClickCancel = output<void>()

  modalClass = computed(() => `size-${this.size()}`)
  checkboxValue = model(false)

  @HostListener("document:keydown.escape", ["$event"])
  onKeydownHandler() {
    if (!this.preventEscapeKey() && this.show()) this.handleCloseModal()
  }

  handleCloseModal() {
    if (this.showClose()) this.onCloseModal.emit()
  }

  preventClose(event: Event) {
    event.stopPropagation()
  }

  handleConfirmClick() {
    this.onClickConfirm.emit()
  }

  handleCancelClick() {
    this.onClickCancel.emit()
  }
}
