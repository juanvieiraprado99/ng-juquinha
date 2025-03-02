import { Component, forwardRef, input } from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FieldContainerComponent } from "../field-container/field-container.component"
import type { template } from "./knob.types"

@Component({
  selector: "juquinha-knob",
  standalone: true,
  templateUrl: "./knob.component.html",
  styleUrl: "./knob.component.scss",
  imports: [FieldContainerComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KnobComponent),
      multi: true,
    },
  ],
})
export class KnobComponent extends ControlBase implements ControlValueAccessor {
  min = input(0)
  max = input(100)
  strokeWidth = input(20, {
    transform: (value: string | number) => {
      const numericValue = typeof value === "string" ? Number(value) : value
      return Math.min(Math.max(numericValue, 10), 30)
    },
  })
  valueColor = input("#3f51b5")
  rangeColor = input("#e0e0e0")
  template = input<template>("")
  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("top")

  override value = 0

  get circumference(): number {
    return 2 * Math.PI * 45
  }

  get arcLength(): number {
    return this.circumference * 0.8
  }

  get strokeDasharray(): string {
    return `${this.arcLength} ${this.circumference}`
  }

  get progressOffset(): number {
    const percentage = 1 - (this.value - this.min()) / (this.max() - this.min())
    return percentage * this.arcLength
  }

  handleInputChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = Number(target.value)

    if (this.value < this.min()) {
      this.value = this.min()
    } else if (this.value > this.max()) {
      this.value = this.max()
    }

    this.onChangeFn(this.value)
  }

  override writeValue(value: any): void {
    this.value = value || 0

    if (this.value < this.min()) {
      this.value = this.min()
    } else if (this.value > this.max()) {
      this.value = this.max()
    }
  }

  override registerOnChange(fn: any): void {
    this.onChangeFn = fn
  }

  override registerOnTouched(fn: any): void {
    this.onTouchedFn = fn
  }
}
