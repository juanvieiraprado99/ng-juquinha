import { NgClass } from "@angular/common"
import { ChangeDetectionStrategy, Component, input } from "@angular/core"
import { IconComponent } from "../../icons/icon/icon.component"
import { TooltipDirective } from "../../tooltips/tooltip/tooltip.directive"
import { position } from "../../tooltips/tooltip/tooltip.types"
import { mode } from "../common/common.types"

@Component({
  selector: "juquinha-label",
  standalone: true,
  templateUrl: "./label.component.html",
  styleUrl: "./label.component.scss",
  imports: [NgClass, IconComponent, TooltipDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent {
  label = input<string>()
  subLabel = input<string>()
  forId = input<string>()
  bold = input<boolean>()
  mode = input<mode>("static")
  hasIconLeft = input<boolean>()
  active = input<boolean>()
  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("right")
}
