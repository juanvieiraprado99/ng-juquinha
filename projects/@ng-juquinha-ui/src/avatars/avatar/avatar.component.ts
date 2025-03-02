import { NgStyle } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core"
import { IconComponent } from "../../icons/icon/icon.component"
import { AcronymPipe } from "../../pipes/acronym.pipe"
import type { size, type } from "./avatar.types"

@Component({
  selector: "juquinha-avatar",
  standalone: true,
  host: {
    class: "juquinha-avatar",
    "[class.size-small]": 'size() === "small"',
    "[class.size-medium]": 'size() === "medium"',
    "[class.size-large]": 'size() === "large"',
    "[style.background-color]": "backgroundColor()",
  },
  imports: [NgStyle, IconComponent, AcronymPipe],
  templateUrl: "./avatar.component.html",
  styleUrl: "./avatar.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  size = input<size>("medium")
  type = input<type>("letters")
  value = input.required<string>()
  backgroundColor = input("var(--juquinha-primary-color)")
  color = input("#fff")

  iconSize = computed(() => {
    return this.type() === "icon"
      ? {
          large: "18",
          medium: "14",
          small: "10",
        }[this.size()]
      : ""
  })
}
