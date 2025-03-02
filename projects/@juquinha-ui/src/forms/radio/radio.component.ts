import { NgClass } from "@angular/common"
import { Component, computed, forwardRef, input } from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FieldContainerComponent } from "../field-container/field-container.component"
import type { direction } from "./radio.types"

@Component({
  selector: "juquinha-radio",
  standalone: true,
  imports: [NgClass, FieldContainerComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true,
    },
  ],
  templateUrl: "./radio.component.html",
  styleUrl: "./radio.component.scss",
})
export class RadioComponent
  extends ControlBase
  implements ControlValueAccessor
{
  options = input.required<any[]>()
  labelKey = input("label")
  valueKey = input("value")
  direction = input<direction>("vertical")
  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("top")

  radioClass = computed(() => `juquinha-radio--direction-${this.direction()}`)

  handleSetValue(value: any) {
    this.value = value
    this.onChangeFn(this.value)
    this.handleChanged()
  }
}
