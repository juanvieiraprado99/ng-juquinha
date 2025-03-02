import { NgClass, NgStyle } from "@angular/common"
import { ChangeDetectionStrategy, Component } from "@angular/core"
import { IconComponent } from "../../icons/icon/icon.component"
import { position } from "./tooltip.types"

@Component({
  selector: "juquinha-tooltip",
  standalone: true,
  imports: [NgStyle, NgClass, IconComponent],
  templateUrl: "./tooltip.component.html",
  styleUrl: "./tooltip.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  tooltipTitle = ""
  tooltipText = ""
  icon = ""
  tooltipPosition: position = "bottom"
  left = 0
  top = 0
}
