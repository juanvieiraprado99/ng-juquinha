import { NgClass } from "@angular/common"
import { Component, forwardRef, input } from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { HintTextComponent } from "../hint-text/hint-text.component"
import { LabelComponent } from "../label/label.component"

@Component({
  selector: "juquinha-switch",
  standalone: true,
  imports: [NgClass, LabelComponent, HintTextComponent],
  templateUrl: "./switch.component.html",
  styleUrl: "./switch.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
})
export class SwitchComponent
  extends ControlBase
  implements ControlValueAccessor
{
  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("top")

  handleSwitchState() {
    this.value = !this.value
    this.onChangeFn(this.value)
    this.handleChanged()
  }
}
