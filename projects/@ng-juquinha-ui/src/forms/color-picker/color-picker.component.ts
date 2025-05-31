import { NgClass } from "@angular/common"
import { Component, forwardRef, input, signal } from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FieldContainerComponent } from "../field-container/field-container.component"
import type { ColorType } from "./color-picker.types"

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
  colorFormat = input<ColorType>("hex")

  override value = "#000000"

  isCopyDisabled = signal(false)
  copyText = signal("")

  onColorChange(event: Event) {
    const input = event.target as HTMLInputElement
    this.value = input.value
    this.onChangeFn(this.formattedColor())
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

  formattedColor(): string {
    switch (this.colorFormat()) {
      case "hsl":
        return this.hexToHsl(this.value)
      case "rgb":
        return this.hexToRgb(this.value)
      default:
        return this.value // Retorna o valor em HEX por padrão
    }
  }

  private hexToHsl(hex: string): string {
    const r = Number.parseInt(hex.slice(1, 3), 16) / 255
    const g = Number.parseInt(hex.slice(3, 5), 16) / 255
    const b = Number.parseInt(hex.slice(5, 7), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  }

  private hexToRgb(hex: string): string {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    return `rgb(${r}, ${g}, ${b})`
  }

  copyToClipboard() {
    const colorValue = this.formattedColor()

    if (this.isCopyDisabled()) return

    navigator.clipboard
      .writeText(colorValue)
      .then(() => {
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
