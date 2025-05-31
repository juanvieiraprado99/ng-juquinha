import {
  Component,
  Injector,
  OnInit,
  computed,
  inject,
  input,
  output,
  signal,
} from "@angular/core"
import { FormControl, FormGroup, FormGroupDirective } from "@angular/forms"
import { ConfigService } from "../../services/config.service"
import type { FormCustomError } from "./common.model"
import type { autocomplete } from "./common.types"
import { FORM_CONTROL } from "./form-control.service"

@Component({
  template: "",
})
export abstract class ControlBase implements OnInit {
  protected readonly injector = inject(Injector)
  private formGroupDirective!: FormGroupDirective

  private readonly configService = inject(ConfigService)
  protected config = this.configService.getConfig()

  fieldId = input<string>()
  label = input<string>()
  subLabel = input<string>()
  hintText = input<string>()
  placeholder = input("")
  disabled = input(false)
  autocomplete = input<autocomplete>("off")
  formControlName = input<string>()
  iconLeft = input<string>()
  iconRight = input<string>()
  maxLength = input<number>(9999)

  enableErrorState = input(true)
  showErrorOnlyOnSubmit = input(false)
  customErrorMessages = input<FormCustomError>({})
  private errors: FormCustomError = {
    required: "O campo é obrigatório",
    requiredTrue: "É obrigatório marcar a caixa de seleção",
    default: "Verifique se preencheu o campo corretamente",
  }

  onFocus = output()
  onBlur = output()
  onKeyPressed = output<KeyboardEvent>()
  onChange = output<string>()

  focused = signal(false)
  id = computed(() => {
    let id = this.fieldId() ? this.fieldId() : (this.formControlName() ?? "")
    if (id === "") id = `field-${Math.floor(Math.random() * 999999)}`
    return id
  })

  value: any
  formGroup!: FormGroup
  control!: FormControl
  onChangeFn = (value: any) => {}
  onTouchedFn = () => {}

  ngOnInit(): void {
    this.setFormGroupRef()
    this.setErrors()
  }

  private setFormGroupRef() {
    try {
      this.formGroupDirective = this.injector.get(FormGroupDirective)
    } catch {
      return
    }

    const formGroup = this.formGroupDirective.form
    if (!formGroup) return

    this.formGroup = formGroup
    this.control = this.formGroup.controls[
      this.formControlName()!
    ] as FormControl
  }

  private setErrors() {
    for (let error in this.customErrorMessages) {
      const value = this.customErrorMessages()[error]
      this.errors[error] = value
    }
  }

  writeValue(obj: any) {
    this.onTouchedFn()
    this.value = obj
  }

  registerOnChange(fn: any) {
    this.onChangeFn = fn
  }

  registerOnTouched(fn: any) {
    this.onTouchedFn = fn
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement
    this.value = input.value
    this.onChangeFn(this.value)
  }

  showErrorMessage() {
    if (!this.control || !this.enableErrorState()) return false
    if (this.showErrorOnlyOnSubmit()) return this.formGroupDirective.submitted

    return (
      (this.control.touched || this.formGroupDirective.submitted) &&
      this.control.invalid
    )
  }

  getErrorMessage() {
    let errorMessage: string = this.errors["default"]
    const controlErrors = this.control.errors

    for (let controlError in controlErrors) {
      if (controlError.includes(FORM_CONTROL.API_ERROR_MESSAGE_KEY))
        return controlError.split(FORM_CONTROL.SEPARATOR_IDENTIFIER)[1]

      const error = this.errors[controlError]
      if (!error) continue
      errorMessage = error
    }

    return errorMessage
  }

  handleBlur() {
    this.markControlAsTouched()
    this.onTouchedFn()
    this.onBlur.emit()
    this.focused.set(false)
  }

  onHandleFocus() {
    this.focused.set(true)
    this.onFocus.emit()
  }

  handleKeyPressed(event: KeyboardEvent) {
    this.onKeyPressed.emit(event)
  }

  handleChanged() {
    this.onChange.emit(this.value)
  }

  markControlAsTouched() {
    if (this.formGroup) this.control?.markAsTouched()
  }

  getDefaultStylesClass() {
    return {
      "field--invalid": this.showErrorMessage(),
      "field--disabled": this.disabled(),
      "field--has-left-icon": this.iconLeft(),
      "field--has-right-icon": this.iconRight(),
      "field--float": this.config.fieldMode === "float",
    }
  }
}
