import { NgStyle } from "@angular/common"
import { ChangeDetectionStrategy, Component, input } from "@angular/core"
import { IconComponent } from "../../icons/icon/icon.component"
import type { style } from "./divider.types"

@Component({
  selector: "juquinha-divider",
  standalone: true,
  imports: [NgStyle, IconComponent],
  templateUrl: "./divider.component.html",
  host: {
    "[class.style--dashed]": 'this.style() === "dashed"',
    "[class.style--solid]": 'this.style() === "solid"',
  },
  styleUrl: "./divider.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {
  style = input<style>("solid")
  lineColor = input("var(--juquinha-divider-line-color)")
  text = input<string>()
  textColor = input("var(--juquinha-divider-text-color)")
  icon = input<string>()
  iconColor = input("var(--juquinha-divider-icon-color)")
}
