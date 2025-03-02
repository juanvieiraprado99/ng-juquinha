import { NgStyle } from "@angular/common"
import { Component, HostListener, type OnInit, inject } from "@angular/core"
import { IconComponent } from "../../public-api"
import type { Confirm, ConfirmPosition } from "./confirm.model"
import { ConfirmationService } from "./confirmation.service"

@Component({
  selector: "juquinha-confirm-popup",
  standalone: true,
  imports: [NgStyle, IconComponent],
  templateUrl: "./confirm-popup.component.html",
  styleUrl: "./confirm-popup.component.scss",
})
export class ConfirmPopupComponent implements OnInit {
  private readonly confirmationService = inject(ConfirmationService)

  id = `confirm-popup-${Math.floor(Math.random() * 99999)}`
  confirm: Confirm | null = null
  position: ConfirmPosition | null = null

  @HostListener("window:click", ["$event"])
  handleClickOutsidePopup(event: Event): void {
    const el = document.getElementById(this.id)
    if (!el || !this.confirm) return
    if (this.confirm.target.contains(event.target as Node)) return
    if (!el.contains(event.target as Node)) this.hidePopup()
  }

  ngOnInit(): void {
    this.confirmationService.getObservable().subscribe((confirm: Confirm) => {
      if (!confirm.target) return
      this.confirm = confirm

      const rect = confirm.target.getBoundingClientRect()

      this.position = {
        left: rect.left,
        top: rect.top + rect.height + 8,
      }
    })
  }

  public handleClickAccept(): void {
    if (this.confirm?.accept) this.confirm?.accept()
    this.hidePopup()
  }

  public handleClickReject(): void {
    if (this.confirm?.reject) this.confirm?.reject()
    this.hidePopup()
  }

  private hidePopup(): void {
    this.confirm = null
    this.position = null
  }
}
