import { NgStyle } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core"
import { IconComponent } from "../../icons/icon/icon.component"
import type { BadgeStyle } from "./badge-style.model"
import type { variant } from "./badge.types"

@Component({
  selector: "juquinha-badge",
  standalone: true,
  imports: [NgStyle, IconComponent],
  templateUrl: "./badge.component.html",
  styleUrl: "./badge.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  color = input("var(--juquinha-primary-color)")
  textColor = input("var(--juquinha-neutral-color-0)")
  variant = input<variant>("primary")
  label = input<string>()
  icon = input<string>()
  iconSize = input("16")
  removable = input(false)

  onClickRemove = output()

  colorStyles = computed(() => {
    return {
      primary: {
        "background-color": this.color(),
      },
      secondary: {
        "background-color": "transparent",
        border: `1px solid ${this.color()}`,
      },
    }[this.variant()] as BadgeStyle
  })

  handleRemove() {
    this.onClickRemove.emit()
  }
}
