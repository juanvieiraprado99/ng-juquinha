import { NgClass } from "@angular/common"
import { Component, forwardRef, input } from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import { IconComponent } from "../../icons/icon/icon.component"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { HintTextComponent } from "../hint-text/hint-text.component"
import { LabelComponent } from "../label/label.component"
import type { CheckboxShape } from "./checkbox.types"

@Component({
  selector: "juquinha-checkbox",
  standalone: true,
  imports: [NgClass, LabelComponent, HintTextComponent, IconComponent],
  templateUrl: "./checkbox.component.html",
  styleUrl: "./checkbox.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent
  extends ControlBase
  implements ControlValueAccessor
{
  ariaLabel = input<string>()
  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("top")
  shape = input<CheckboxShape>("square")

  switchValue() {
    if (this.disabled()) return
    this.value = !this.value
    this.onChangeFn(this.value)
  }
}
