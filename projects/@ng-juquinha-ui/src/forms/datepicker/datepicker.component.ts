import { DatePipe, NgClass } from "@angular/common"
import { Component, forwardRef, inject, input } from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FormControlService } from "../common/form-control.service"
import { FieldContainerComponent } from "../field-container/field-container.component"
import type { DateType } from "./date.types"

@Component({
  selector: "juquinha-datepicker",
  standalone: true,
  imports: [NgClass, FieldContainerComponent, DatePipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
    DatePipe,
  ],
  templateUrl: "./datepicker.component.html",
  styleUrl: "./datepicker.component.scss",
})
export class DatepickerComponent
  extends ControlBase
  implements ControlValueAccessor
{
  private readonly formControlService = inject(FormControlService)
  private readonly datePipe = inject(DatePipe)

  validateDate = input(true)
  /**
   * Tipos de input de data, sendo possível escolher entre:
   * - `date`: Campo de data padrão.
   * - `time`: Escolha o horário do dia atual.
   * - `datetime-local`: Escolha um dia com data e hora.
   *
   * @group Props
   */
  type = input<DateType>("date")
  minDate = input<Date>()
  maxDate = input<Date>()
  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("top")

  override writeValue(obj: any): void {
    this.onTouchedFn()
    setTimeout(() => {
      this.value = this.transformDate(obj)
      this.onChangeFn(this.value)
    })
  }

  override onInput(event: Event) {
    const input = event.target as HTMLInputElement
    this.value = this.transformDate(input.value)
    this.onChangeFn(this.value)
    this.onChange.emit(this.value)
  }

  private transformDate(value: any) {
    if (!value) return null

    const timeRegex = /^\d{2}:\d{2}$/
    if (typeof value === "string" && timeRegex.test(value)) {
      const [hours, minutes] = value.split(":").map(Number)
      const date = new Date()
      date.setHours(hours, minutes, 0, 0)
      return date
    }

    if (value instanceof Date) return value

    let datePart = value
    let timePart = null

    if (value.includes("T")) {
      ;[datePart, timePart] = value.split("T")
    }

    const valueSplitted: string[] = datePart.split("-")

    const day = Number(valueSplitted[2])
    const month = Number(valueSplitted[1]) - 1
    const year = Number(valueSplitted[0])

    if (year < 999) return null

    let hours = 0
    let minutes = 0

    if (timePart) {
      const timeSplitted = timePart.split(":")
      hours = Number(timeSplitted[0])
      minutes = Number(timeSplitted[1])
    }

    const date = new Date(year, month, day, hours, minutes)
    if (date.toString() === "Invalid Date") return null

    return date
  }

  override handleBlur() {
    if (this.validateDate()) this.checkDateIsValid()
    this.onTouchedFn()
    this.onBlur.emit()
    this.focused.set(false)
  }

  private checkDateIsValid() {
    const errorMessage = this.getDatepickerErrorMessage()
    if (!errorMessage) return

    const formControl = this.formControlName()

    if (formControl) {
      this.formControlService.setControlError(
        this.formGroup,
        formControl,
        errorMessage
      )
    }
  }

  private getDatepickerErrorMessage(): string | undefined {
    const date = new Date(this.value)
    let errorMessage = ""

    if (date.toString() === "Invalid Date")
      errorMessage += "Informe uma data válida."

    const minDateValue = this.minDate()
    if (minDateValue) {
      if (date < minDateValue) {
        const minDate = this.datePipe.transform(minDateValue, "dd/MM/yyyy")
        errorMessage += ` A data mínima é ${minDate}.`
      }
    }

    const maxDate = this.maxDate()
    if (maxDate) {
      if (date > maxDate) {
        const maxDate = this.datePipe.transform(this.maxDate(), "dd/MM/yyyy")
        errorMessage += ` A data máxima é ${maxDate}.`
      }
    }

    return errorMessage === "" ? undefined : errorMessage
  }
}
