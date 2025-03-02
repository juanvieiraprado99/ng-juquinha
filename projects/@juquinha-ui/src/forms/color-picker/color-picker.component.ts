import { NgClass } from "@angular/common"
import { Component, forwardRef, input, signal } from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FieldContainerComponent } from "../field-container/field-container.component"

@Component({
  selector: "juquinha-color-picker",
  standalone: true,
  templateUrl: "./color-picker.component.html",
  styleUrl: "./color-picker.component.scss",
  imports: [NgClass, FieldContainerComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent
  extends ControlBase
  implements ControlValueAccessor
{
  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("top")

  override value = "#000000"

  isCopyDisabled = signal(false)
  copyText = signal("")

  onColorChange(event: Event) {
    const input = event.target as HTMLInputElement
    this.value = input.value
    this.onChangeFn(this.value)
  }

  override writeValue(value: any): void {
    this.value = value || "#000000"
  }

  override registerOnChange(fn: any): void {
    this.onChangeFn = fn
  }

  override registerOnTouched(fn: any): void {
    this.onTouchedFn = fn
  }

  copyToClipboard(value: string) {
    if (this.isCopyDisabled()) return

    navigator.clipboard
      .writeText(value)
      .then(() => {
        // const originalValue = this.value;
        this.copyText.set("Copiado!")
        this.isCopyDisabled.set(true)

        setTimeout(() => {
          this.copyText.set("")
          this.isCopyDisabled.set(false)
        }, 2000)
      })
      .catch(err => {
        console.error("Erro ao copiar: ", err)
      })
  }
}
