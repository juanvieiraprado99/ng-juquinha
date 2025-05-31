import { NgClass } from "@angular/common"
import {
  type AfterViewInit,
  Component,
  type ElementRef,
  type OnDestroy,
  ViewChild,
  computed,
  effect,
  forwardRef,
  input,
  output,
  signal,
} from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask"
import { Subject, debounceTime } from "rxjs"
import { IconComponent } from "../../icons/icon/icon.component"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FieldContainerComponent } from "../field-container/field-container.component"
import type { type } from "./input.types"

const MASK_REMOVE_CHARS = [".", "/", "-", "(", ")", " "]
const MASK_REMOVE_PREFIX = ["R$", " "]

@Component({
  selector: "juquinha-input",
  standalone: true,
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss",
  host: { class: "juquinha-input" },
  imports: [NgClass, FieldContainerComponent, NgxMaskDirective, IconComponent],
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
  @ViewChild("inputElement", { static: false })
  inputElement!: ElementRef<HTMLInputElement>

  /**
   * @description
   * Define o tipo do campo de acordo com a informação que deve ser preenchida, por padrão o campo é `text`, campo de texto.
   *
   * Campos disponíveis:
   * - text: Campo comum de texto.
   * - password: Campo para senhas, que pode esconder os dígitos, por exemplo, com `****`.
   * - tel: Campo de telefone, que no mobile habilita o teclado de números.
   * - number: Campo numérico, que permite digitar apenas números.
   * - email: Campo de email, que no mobile habilita o `@` quando o teclado ficar visível.
   * - search: campo de busca, que habilita a busca facilitada no mobile.
   */
  type = input<type>("text")
  /**
   * @description
   * Define uma máscara de formatação para o campo de entrada, utilizando a biblioteca ngx-mask.
   *
   * A máscara controla visualmente como o valor é digitado (ex: '000.000.000-00' para CPF),
   * mas o valor emitido para o formulário é limpo dos caracteres de formatação, a menos que
   * a propriedade `keepMaskOnValue` esteja ativada.
   *
   * Exemplos de máscara:
   * - CPF: '000.000.000-00'
   * - CNPJ: '00.000.000/0000-00'
   * - Telefone: '(00) 00000-0000'
   * - Data: '00/00/0000'
   * - Monetário: 'separator.2'
   *
   * Caracteres especiais da máscara:
   * - 0: dígito obrigatório (0-9)
   * - 9: dígito opcional (0-9)
   * - A: letra obrigatória (a-z, A-Z)
   * - S: letra opcional (a-z, A-Z)
   *
   * Para mais detalhes e formatos possíveis, consulte a documentação oficial: https://www.npmjs.com/package/ngx-mask
   */
  mask = input<string>()
  /**
   * @description
   * Define a pontuação utilizada para separação das casas de milhar.
   */
  thousandSeparator = input<string>("")
  /**
   * @description
   * Define um limite para a formatação numérica com separadores.
   */
  separatorLimit = input<string>("")
  /**
   * @description
   * Adiciona um prefixo ao digitar no campo:
   *
   * Exemplos de prefixo:
   * - Moeda BRL: 'R$ '
   * - Moeda USD: '$'
   */
  prefix = input<string>("")
  /**
   * @description
   * Adiciona um sufixo ao digitar no campo:
   *
   * Exemplos de sufixo:
   * - Porcentagem: ' %'
   */
  suffix = input<string>("")
  /**
   * @description
   * Habilita a visualização do formato da máscara informada na propriedade `mask`.
   */
  showMaskTyped = input(false)
  /**
   * @description
   * Mantém a máscara informada em `mask` no valor do campo.
   */
  keepMaskOnValue = input(false)
  /**
   * @description
   * Tempo de espera (em milissegundos) após a última tecla digitada para emitir o evento `onTyped`.
   * Só é utilizado quando `enableTypeListener` estiver ativado.
   */
  typeDelay = input(500)
  /**
   * @description
   * Ativa o listener para detectar digitação do usuário e emitir o evento `onTyped` com debounce.
   */
  enableTypeListener = input(false)
  /**
   * @description
   * Título exibido no tooltip associado ao campo, se fornecido.
   */
  tooltipTitle = input<string>()
  /**
   * @description
   * Texto explicativo exibido no tooltip associado ao campo, se fornecido.
   */
  tooltipText = input<string>()
  /**
   * @description
   * Ícone a ser exibido junto ao tooltip, caso desejado.
   * Pode ser um nome de ícone compatível com o sistema de ícones utilizado no projeto.
   */
  tooltipIcon = input<string>()
  /**
   * @description
   * Define a posição onde o tooltip será exibido em relação ao campo.
   *
   * Valores possíveis:
   * - `top`: Exibido no topo.
   * - `right`: Exibido no lado direito.
   * - `bottom`: Exibido abaixo.
   * - `left`: Exibido no lado esquerdo.
   */
  tooltipPosition = input<position>("top")

  /**
   * @description
   * Evento disparado quando o usuário digita no campo e para por um determinado tempo.
   * O tempo de inatividade é controlado pela propriedade `typeDelay`.
   *
   * Útil para implementar buscas automáticas, sugestões ou outras interações que
   * não devem acontecer a cada tecla pressionada, mas sim após o usuário parar de digitar.
   *
   * Este evento **só é emitido** quando `enableTypeListener` estiver ativado.
   */
  onTyped = output()

  passwordVisible = signal(false)

  inputType = computed(() => {
    if (this.type() === "password") {
      return this.passwordVisible() ? "text" : "password"
    }
    return this.type()
  })

  showPasswordToggle = computed(() => this.type() === "password")

  passwordToggleIcon = computed(() =>
    this.passwordVisible() ? "eye-open" : "eye-closed"
  )

  computedIconRight = computed(() =>
    this.type() === "password" ? "" : this.iconRight()
  )

  private keyTyped$!: Subject<void>
  private ngxMaskDirective?: NgxMaskDirective

  constructor() {
    super()

    effect(() => {
      const mask = this.mask()
      if (mask && this.ngxMaskDirective) {
        this.applyNewMask(mask)
      }
    })
  }

  ngAfterViewInit(): void {
    if (this.enableTypeListener()) this.setKeyTypedListener()

    setTimeout(() => {
      this.ngxMaskDirective = this.inputElement?.nativeElement?.querySelector(
        "[mask]"
      ) as any
    })
  }

  private setKeyTypedListener() {
    this.keyTyped$ = new Subject<void>()

    this.keyTyped$
      .pipe(debounceTime(this.typeDelay()))
      .subscribe(() => this.onTyped.emit())
  }

  private applyNewMask(newMask: string) {
    if (!this.inputElement?.nativeElement) return

    const input = this.inputElement.nativeElement
    const currentValue = this.removeMaskChars(input.value)

    input.value = ""

    setTimeout(() => {
      if (currentValue) {
        const ngxMaskPipe = this.injector.get(NgxMaskPipe)
        const maskedValue = ngxMaskPipe.transform(currentValue, newMask)
        input.value = maskedValue
        this.value = maskedValue
      }
    }, 0)
  }

  override writeValue(obj: any) {
    const mask = this.mask()
    if (mask && obj) {
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

  private removeMaskChars(value: any) {
    if (!value) return value

    if (this.mask() && !this.keepMaskOnValue()) {
      MASK_REMOVE_CHARS.forEach(char => (value = value.replaceAll(char, "")))

      if (this.mask() && this.mask()?.includes("separator"))
        value = value.replaceAll(",", ".")
    }

    if (this.prefix() !== "" && !this.keepMaskOnValue())
      MASK_REMOVE_PREFIX.forEach(char => (value = value.replaceAll(char, "")))

    return value
  }

  togglePasswordVisibility() {
    this.passwordVisible.update(visible => !visible)
  }

  ngOnDestroy(): void {
    if (!this.enableTypeListener()) return
    this.keyTyped$.next()
    this.keyTyped$.unsubscribe()
  }
}
