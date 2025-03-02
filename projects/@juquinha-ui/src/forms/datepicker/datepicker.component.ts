import { DatePipe, NgClass } from "@angular/common"
import { Component, forwardRef, inject, input } from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FormControlService } from "../common/form-control.service"
import { FieldContainerComponent } from "../field-container/field-container.component"

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

    if (value instanceof Date) return value

    if (value.includes("T")) value = value.split("T")[0]

    const valueSplitted: string[] = value.split("-")

    const day = Number(valueSplitted[2])
    const month = Number(valueSplitted[1]) - 1
    const year = Number(valueSplitted[0])

    if (year < 999) return null

    const date = new Date(year, month, day)
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

    this.formControlService.setControlError(
      this.formGroup,
      this.formControlName()!,
      errorMessage
    )
  }

  private getDatepickerErrorMessage(): string | undefined {
    const date = new Date(this.value)
    let errorMessage = ""

    if (date.toString() === "Invalid Date")
      errorMessage += "Informe uma data válida."

    if (date < this.minDate()!) {
      const minDate = this.datePipe.transform(this.minDate(), "dd/MM/yyyy")
      errorMessage += ` A data mínima é ${minDate}.`
    }

    if (date > this.maxDate()!) {
      const maxDate = this.datePipe.transform(this.maxDate(), "dd/MM/yyyy")
      errorMessage += ` A data máxima é ${maxDate}.`
    }

    return errorMessage === "" ? undefined : errorMessage
  }
}
