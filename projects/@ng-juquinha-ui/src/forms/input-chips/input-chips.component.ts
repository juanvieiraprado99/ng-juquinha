import { NgClass } from "@angular/common"
import { Component, forwardRef, input, model } from "@angular/core"
import {
  type ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from "@angular/forms"
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask"
import { BadgeComponent } from "../../badges/badge/badge.component"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FieldContainerComponent } from "../field-container/field-container.component"
import type { type } from "./input-chips.types"

@Component({
  selector: "juquinha-input-chips",
  standalone: true,
  templateUrl: "./input-chips.component.html",
  styleUrl: "./input-chips.component.scss",
  imports: [
    NgClass,
    FormsModule,
    BadgeComponent,
    NgxMaskDirective,
    FieldContainerComponent,
    NgxMaskPipe,
  ],
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputChipsComponent),
      multi: true,
    },
  ],
})
export class InputChipsComponent
  extends ControlBase
  implements ControlValueAccessor
{
  inputChips = input<string[]>([])
  mask = input<string>()
  type = input<type>("text")
  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("top")

  word = model<string>("")
  highlightedChip: string | null = null

  handleClickRemove(index: number) {
    const chips: string[] = this.value
    chips.splice(index, 1)

    this.value = chips
    this.onChangeFn(this.value)

    this.markControlAsTouched()
  }

  preventSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") event.preventDefault()
  }

  public override handleKeyPressed(event: KeyboardEvent): void {
    this.onKeyPressed.emit(event)

    if (
      event.key === "Enter" ||
      event.key === "," ||
      ((event.ctrlKey || event.metaKey) && event.key === "v")
    ) {
      const values = this.word().split(",")
      this.word.set("")

      let chips = this.value
      if (typeof chips !== "object") chips = []

      for (const value of values) {
        if (value === "" || chips.indexOf(value) >= 0) continue

        chips.push(value)
      }

      this.value = chips
      this.onChangeFn(this.value)
    }

    this.highlightedChip = this.word()
  }

  isChipHighlighted(chip: string): boolean {
    return this.highlightedChip === chip
  }
}
