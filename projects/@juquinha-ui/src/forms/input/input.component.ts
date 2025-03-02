import { NgClass } from "@angular/common"
import {
  type AfterViewInit,
  Component,
  type OnDestroy,
  forwardRef,
  input,
  output,
} from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask"
import { Subject, debounceTime } from "rxjs"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FieldContainerComponent } from "../field-container/field-container.component"
import type { type } from "./input.types"

const MASK_REMOVE_CHARS = [".", ",", "/", "-", "(", ")", " "]

@Component({
  selector: "juquinha-input",
  standalone: true,
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss",
  host: { class: "juquinha-input" },
  imports: [NgClass, FieldContainerComponent, NgxMaskDirective],
  providers: [
    NgxMaskPipe,
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent
  extends ControlBase
  implements ControlValueAccessor, AfterViewInit, OnDestroy
{
  type = input<type>("text")
  mask = input<string>()
  keepMaskOnValue = input(false)
  typeDelay = input(500)
  enableTypeListener = input(false)
  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("top")

  onTyped = output()

  private keyTyped$!: Subject<void>

  ngAfterViewInit(): void {
    if (this.enableTypeListener()) this.setKeyTypedListener()
  }

  private setKeyTypedListener() {
    this.keyTyped$ = new Subject<void>()

    this.keyTyped$
      .pipe(debounceTime(this.typeDelay()))
      .subscribe(() => this.onTyped.emit())
  }

  override writeValue(obj: any) {
    const mask = this.mask()
    if (mask) {
      const ngxMaskPipe = this.injector.get(NgxMaskPipe)
      obj = ngxMaskPipe.transform(obj, mask)
    }

    setTimeout(() => (this.value = obj))
  }

  override onInput(event: Event) {
    const input = event.target as HTMLInputElement
    let value = input.value

    this.value = value

    value = this.removeMaskChars(value)
    this.onChangeFn(value)
  }

  override handleChanged() {
    const value = this.removeMaskChars(this.value)
    this.onChange.emit(value)
  }

  override handleKeyPressed(event: KeyboardEvent): void {
    this.onKeyPressed.emit(event)
    if (this.enableTypeListener()) this.keyTyped$.next()
  }

  private removeMaskChars(value: string): string {
    if (this.mask() && !this.keepMaskOnValue()) {
      for (const char of MASK_REMOVE_CHARS) {
        value = value.replaceAll(char, "")
      }
    }

    return value
  }

  ngOnDestroy(): void {
    if (!this.enableTypeListener()) return
    this.keyTyped$.next()
    this.keyTyped$.unsubscribe()
  }
}
