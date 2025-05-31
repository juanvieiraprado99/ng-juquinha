import { NgClass } from "@angular/common"
import {
  type AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  type OnDestroy,
  forwardRef,
  input,
  signal,
} from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import { OnlyNumbersDirective } from "../../directives/only-numbers.directive"
import { IconComponent } from "../../icons/icon/icon.component"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FieldContainerComponent } from "../field-container/field-container.component"

type BadgeDirection = "left" | "right" | ""

@Component({
  selector: "juquinha-slider",
  standalone: true,
  imports: [
    NgClass,
    FieldContainerComponent,
    OnlyNumbersDirective,
    IconComponent,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    },
  ],
  templateUrl: "./slider.component.html",
  styleUrl: "./slider.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent
  extends ControlBase
  implements ControlValueAccessor, AfterContentInit, OnDestroy
{
  /**
   * @description
   * Titulo da mensagem do tooltip.
   *
   */
  tooltipTitle = input("")
  /**
   * @description
   * Descrição do tooltip.
   *
   */
  tooltipText = input("")
  /**
   * @description
   * Ícone que pode ser exibido ao mostrar o tooltip.
   *
   */
  tooltipIcon = input("")
  /**
   * @description
   * Posição que o tooltip irá aparecer, pondendo ser:
   * - `left`: esquerda
   * - `right`: direita
   * - `top`: topo
   * - `bottom`: abaixo
   *
   */
  tooltipPosition = input<position>("top")
  /**
   * @description
   * Valor mínimo que poderá ser atingido.
   *
   */
  min = input(0)
  /**
   * @description
   * Valor máximo que poderá ser atingido.
   *
   */
  max = input(100)
  /**
   * @description
   * Tamnho máximo de caracteres que pode ser digitado no input do badge.
   *
   * @default São de 4 dígitos.
   *
   */
  maxLengthBadge = input(4)
  /**
   * @description
   * Interválo de valor para seleção, como exemplo:
   * - Se com valor `5`, o slider irá navegar de 5 em 5 números.
   *
   */
  step = input(1)
  /**
   * @description
   * habilita a seleção de uma faixa(range) de valores.
   *
   */
  range = input(false)
  /**
   * @description
   * Habilita visualização de uma medalha(badge) com o valor do slider.
   *
   */
  showBadge = input(false)
  /**
   * @description
   * Habilita visualização do local da medalha(badge), podendo ser:
   * - `left`: esquerda
   * - `right`: direita
   * - Se não informado ou passar o valor como `''`, será mostrado dos dois lados do slider
   *
   */
  badgeDirection = input<BadgeDirection>("")
  /**
   * @description
   * Habilita visualização do balão com o valor que esta selecionado.
   *
   */
  showBalloon = input(false)

  /**
   * @description
   * Determina a cor da "bolinha" de seleção de valor.
   *
   */
  thumbColor = input("var(--juquinha-slide-thumb-color)")
  /**
   * @description
   * Determina a cor da barra de fundo do slider.
   *
   */
  sliderBackgroundColor = input("var(--juquinha-neutral-color-300)")
  /**
   * @description
   * Determina a cor da medalha(badge).
   *
   */
  badgeColor = input("var(--juquinha-primary-color)")
  /**
   * @description
   * Determina a cor do valor na medalha(badge).
   *
   */
  textColor = input("var(--juquinha-slide-badge-font-color)")
  /**
   * @description
   * Determina a cor do ícone exibido na medalha(badge).
   *
   */
  iconColor = input("var(--juquinha-slide-icon-color)")
  /**
   * @description
   * Se {@link range} for habilitado.
   * Determina a cor de fundo entres os valores selecionados.
   *
   */
  sliderFillColor = input("var(--juquinha-slide-thumb-color)")
  /**
   * @description
   * Tamanho da "bolinha" do slider.
   *
   */
  thumbSize = input("var(--juquinha-slide-thumb-size)")
  /**
   * @description
   * Altera o tempo que o balão com valor do slider ficará visivel.
   *
   * @default São 3000ms.
   */
  visibleTimeBalloon = input(3000)

  value1 = signal(0)
  value2 = signal(100)
  inputValue1 = signal("0")
  inputValue2 = signal("100")
  showBalloon1 = signal(false)
  showBalloon2 = signal(false)
  balloonPosition1 = signal({ x: 0, y: 0 })
  balloonPosition2 = signal({ x: 0, y: 0 })

  private balloonTimeout1: any
  private balloonTimeout2: any

  override value: any = 0

  onSliderChange(event: Event, isFirstValue: boolean, ballon: boolean) {
    const input = event.target as HTMLInputElement
    const value = Number(input.value)

    if (this.visibleTimeBalloon() !== 0) {
      if (isFirstValue) {
        clearTimeout(this.balloonTimeout1)
      } else {
        clearTimeout(this.balloonTimeout2)
      }
    }

    if (this.range()) {
      if (isFirstValue) {
        this.value1.set(value)
        this.inputValue1.set(value.toString())
        this.showBalloon1.set(true)
        if (this.visibleTimeBalloon() !== 0) {
          this.balloonTimeout1 = setTimeout(() => {
            this.showBalloon1.set(false)
          }, this.visibleTimeBalloon())
        }
      } else {
        this.value2.set(value)
        this.inputValue2.set(value.toString())
        this.showBalloon2.set(true)
        if (this.visibleTimeBalloon() !== 0) {
          this.balloonTimeout2 = setTimeout(() => {
            this.showBalloon2.set(false)
          }, this.visibleTimeBalloon())
        }
      }

      this.value = [
        Math.min(this.value1(), this.value2()),
        Math.max(this.value1(), this.value2()),
      ]
    } else {
      this.value1.set(value)
      this.inputValue1.set(value.toString())
      this.showBalloon1.set(true)
      if (this.visibleTimeBalloon() !== 0) {
        this.balloonTimeout1 = setTimeout(() => {
          this.showBalloon1.set(false)
        }, this.visibleTimeBalloon())
      }
      this.value = value
    }

    this.updateBalloonPosition(input, isFirstValue)
    this.onChangeFn(this.value)
  }

  onInputTyping(event: Event, isFirstInput: boolean) {
    const input = event.target as HTMLInputElement
    const numericValue = Number(input.value)

    if (input.value === "") {
      if (isFirstInput) this.inputValue1.set("")
      else this.inputValue2.set("")
      return
    }

    if (numericValue < this.min() || numericValue > this.max()) {
      return
    }

    if (isFirstInput) {
      this.inputValue1.set(input.value)
      this.showBalloon1.set(true)
      if (this.visibleTimeBalloon() !== 0) {
        clearTimeout(this.balloonTimeout1)
        this.balloonTimeout1 = setTimeout(() => {
          this.showBalloon1.set(false)
        }, this.visibleTimeBalloon())
      }
    } else {
      this.inputValue2.set(input.value)
      this.showBalloon2.set(true)
      if (this.visibleTimeBalloon() !== 0) {
        clearTimeout(this.balloonTimeout2)
        this.balloonTimeout2 = setTimeout(() => {
          this.showBalloon2.set(false)
        }, this.visibleTimeBalloon())
      }
    }

    this.onInputComplete(event, isFirstInput)
  }

  onInputComplete(event: Event, isFirstInput: boolean) {
    const input = event.target as HTMLInputElement
    let value = Number(input.value) || 0

    value = Math.min(Math.max(value, this.min()), this.max())

    if (isFirstInput) {
      this.value1.set(value)
      this.inputValue1.set(value.toString())
    } else {
      this.value2.set(value)
      this.inputValue2.set(value.toString())
    }

    if (this.range()) {
      this.value = [
        Math.min(this.value1(), this.value2()),
        Math.max(this.value1(), this.value2()),
      ]
    } else {
      this.value = this.value1()
    }

    this.onChangeFn(this.value)
  }

  getFillLeft(): number {
    if (!this.range()) return 0
    const minVal = Math.min(this.value1(), this.value2())
    return ((minVal - this.min()) / (this.max() - this.min())) * 100
  }

  getFillWidth(): number {
    if (!this.range()) return 0
    const minVal = Math.min(this.value1(), this.value2())
    const maxVal = Math.max(this.value1(), this.value2())
    return ((maxVal - minVal) / (this.max() - this.min())) * 100
  }

  ngAfterContentInit(): void {
    this.onChangeFn(this.value)
  }

  updateBalloonPosition(slider: HTMLInputElement, isFirstValue: boolean) {
    const rect = slider.getBoundingClientRect()
    const value = Number(slider.value)
    const percentage = (value - this.min()) / (this.max() - this.min())

    const thumbSize = Number.parseInt(this.thumbSize()) || 20
    const thumbOffset = thumbSize / 2

    const offsetX = percentage * (rect.width - thumbSize) + thumbOffset

    if (isFirstValue) {
      this.balloonPosition1.set({
        x: offsetX,
        y: -30,
      })
    } else {
      this.balloonPosition2.set({
        x: offsetX,
        y: -30,
      })
    }
  }

  override writeValue(value: any): void {
    if (this.range()) {
      if (Array.isArray(value) && value.length === 2) {
        const [min, max] =
          value[0] <= value[1] ? [value[0], value[1]] : [value[1], value[0]]
        this.value1.set(min)
        this.value2.set(max)
        this.inputValue1.set(min.toString())
        this.inputValue2.set(max.toString())
        this.value = [min, max]
      } else {
        this.value1.set(this.min())
        this.value2.set(this.max())
        this.inputValue1.set(this.min().toString())
        this.inputValue2.set(this.max().toString())
        this.value = [this.min(), this.max()]
      }
    } else {
      const defaultValue = value || this.min()
      this.value1.set(defaultValue)
      this.inputValue1.set(defaultValue.toString())
      this.value = defaultValue
    }
  }

  override registerOnChange(fn: any): void {
    this.onChangeFn = fn
  }

  override registerOnTouched(fn: any): void {
    this.onTouchedFn = fn
  }

  ngOnDestroy(): void {
    clearTimeout(this.balloonTimeout1)
    clearTimeout(this.balloonTimeout2)
  }
}
