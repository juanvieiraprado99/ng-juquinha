import { ChangeDetectionStrategy, Component, input } from "@angular/core"
import { position } from "../../tooltips/tooltip/tooltip.types"
import { mode } from "../common/common.types"
import { HintTextComponent } from "../hint-text/hint-text.component"
import { IconsComponent } from "../icons/icons.component"
import { LabelComponent } from "../label/label.component"

@Component({
  selector: "juquinha-field-container",
  standalone: true,
  imports: [IconsComponent, LabelComponent, HintTextComponent],
  templateUrl: "./field-container.component.html",
  styleUrl: "./field-container.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldContainerComponent {
  fieldId = input<string>()
  label = input<string>()
  subLabel = input<string>()
  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("top")
  iconLeft = input<string>()
  iconRight = input<string>()
  disabled = input(false)
  hintText = input<string>()
  mode = input<mode>("static")
  active = input(false)
}
