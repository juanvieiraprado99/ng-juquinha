import { TitleCasePipe } from "@angular/common"
import { Component, inject, signal } from "@angular/core"
import { ButtonComponent } from "../../../buttons/button/button.component"
import { ToastComponent } from "../toast.component"
import { ToastService } from "../toast.service"
import type { severity } from "../toast.types"

@Component({
  selector: "juquinha-toast-example",
  standalone: true,
  imports: [ButtonComponent, ToastComponent, TitleCasePipe],
  templateUrl: "./example.component.html",
  styleUrl: "./example.component.scss",
})
export class ExampleComponent {
  private readonly toastService = inject(ToastService)

  toast = signal<number>(0)

  severityLevels: severity[] = [
    "default",
    "success",
    "error",
    "warn",
    "info",
    "loading",
  ]
  handleClickNotifications() {
    for (const severity of this.severityLevels) {
      this.toastService.add({
        title: "Notificação Toast!",
        detail: `Detalhes da notificação toast - ${severity}`,
        severity: severity,
        time: severity === "loading" ? 0 : 5000,
        isLoading: severity === "loading",
      })
    }
  }

  handleClick(severity: severity) {
    this.toast.set(
      this.toastService.add({
        title: "Notificação Toast!",
        detail: `Detalhes da notificação toast - ${severity}`,
        severity: severity,
        time: severity === "loading" ? 0 : 5000,
        isLoading: severity === "loading",
      })
    )
  }

  handleConcludeToast() {
    this.toastService.update(this.toast(), {
      title: "Sucesso!",
      detail: "Operação concluída com sucesso",
      severity: "success",
      isLoading: false,
      time: 3000,
    })
  }

  handleClearNotifications() {
    this.toastService.clear()
  }
}
