import { NgClass } from "@angular/common"
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  type ComponentRef,
  type ElementRef,
  type EmbeddedViewRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import { IconComponent } from "../../icons/icon/icon.component"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FieldContainerComponent } from "../field-container/field-container.component"
import { OptionsComponent } from "./options/options.component"

@Component({
  selector: "juquinha-dropdown",
  standalone: true,
  imports: [NgClass, IconComponent, FieldContainerComponent],
  templateUrl: "./dropdown.component.html",
  styleUrl: "./dropdown.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent
  extends ControlBase
  implements ControlValueAccessor, OnChanges
{
  private readonly componentFactoryResolver = inject(ComponentFactoryResolver)
  private applicationRef = inject(ApplicationRef)

  /**
   * @description
   * Responsável por receber a listagem de itens.
   *
   */
  options = input<any[]>([])
  /**
   * @description
   * Propriedade reponsável por atribuir a label da opção.
   *
   */
  labelKey = input("label")
  /**
   * @description
   * Propriedade reponsável por atribuir o valor da opção.
   *
   */
  valueKey = input("value")
  /**
   * @description
   * Exibe o botão para limpar a opção selecionada.
   *
   */
  showClear = input(true)
  /**
   * @description
   * Permite a escolha de multiplas opções.
   *
   */
  multiple = input(false)
  /**
   * @description
   * Permite pesquisar uma opção dentro da listagem.
   *
   */
  search = input(false, {
    transform: (value: string | boolean) =>
      typeof value === "string" ? value === "" || value === "true" : value,
  })
  /**
   * @description
   * Label para o campo de pesquisa.
   *
   */
  searchLabel = input("")
  /**
   * @description
   * Habilita o estado de loading no componente.
   *
   */
  loading = input(false)
  /**
   * @description
   * Habilita o scroll virtual, podendo ser passada uma listagem grande,
   * onde apenas uma pequena quantidade é renderizada por vez.
   *
   */
  virtualScroll = input(false)
  /**
   * @description
   * O checkbox para seleção de todos os itens estará disponível
   * caso a propriedade `multiple` e `showSelectAll` sejam true.
   *
   */
  showSelectAll = input(false)
  /**
   * @description
   * Mensgem exibida quando não houver opções.
   * Mensagem padrão `Nenhuma opção foi encontrada`
   *
   */
  emptyMessage = input("Nenhuma opção foi encontrada")
  /**
   * @description
   * Mensgem exibida quando houver carregamento.
   * Mensagem padrão `Carregando opções...`
   *
   */
  loadingPlaceholder = input("Carregando opções...")
  /**
   * @description
   * Titulo da mensagem do tooltip.
   *
   */
  tooltipTitle = input<string>()
  /**
   * @description
   * Descrição do tooltip.
   *
   */
  tooltipText = input<string>()
  /**
   * @description
   * Ícone que pode ser exibido ao mostrar o tooltip.
   *
   */
  tooltipIcon = input<string>()
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
   * Emite um evento quando selecionar uma opção.
   *
   */
  onSelect = output<any>()
  /**
   * @description
   * Emite um evento quando houver um click no botão para limpar.
   *
   */
  onClear = output<void>()
  /**
   * @description
   * Se `enablePagedRequests` estiver habilitado, sempre que chegar ao final da listagem,
   * será enviado um evento que pode ser utilizado para:
   * - Novas requests para atualizar a listagem
   *
   */

  dropdownOpened = signal(false)

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["options"]?.previousValue) {
      if (
        changes["options"]?.previousValue === null ||
        changes["options"]?.previousValue === undefined ||
        changes["options"]?.previousValue === "" ||
        changes["options"]?.previousValue.length === 0
      ) {
        return
      }
      this.switchDropdownOpenedState()
    }
  }

  @ViewChild("dropdownButton") public buttonRef!: ElementRef
  private optionComponentRef: ComponentRef<OptionsComponent> | null = null

  handleClickClear() {
    this.value = this.multiple() ? [] : null
    this.onClear.emit()
  }

  switchDropdownOpenedState() {
    if (this.optionComponentRef) {
      this.destroyOptionComponent()
      return
    }

    const optionComponent =
      this.componentFactoryResolver.resolveComponentFactory(OptionsComponent)

    this.optionComponentRef = optionComponent.create(this.injector)

    this.applicationRef.attachView(this.optionComponentRef.hostView)

    const domElem = (this.optionComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0]

    document.body.appendChild(domElem)

    this.dropdownOpened.set(true)

    this.setOptionComponentProperties()
  }

  private setOptionComponentProperties() {
    if (!this.optionComponentRef) return

    this.optionComponentRef.instance.labelKey = this.labelKey()
    this.optionComponentRef.instance.multiple = this.multiple()
    this.optionComponentRef.instance.search = this.search()
    this.optionComponentRef.instance.searchLabel = this.searchLabel()
    this.optionComponentRef.instance.valueKey = this.valueKey()
    this.optionComponentRef.instance.value = this.value
    this.optionComponentRef.instance.options = this.options()
    this.optionComponentRef.instance.enableVirtualScroll = this.virtualScroll()
    this.optionComponentRef.instance.showSelectAll = this.showSelectAll()

    this.optionComponentRef.instance.buttonElementRef = this.buttonRef
    this.optionComponentRef.instance.emptyMessage = this.emptyMessage()

    this.optionComponentRef.instance.onItemSelected.subscribe(value =>
      this.handleItemSelected(value)
    )

    this.optionComponentRef.instance.onClickOutside.subscribe(() =>
      this.destroyOptionComponent()
    )
  }

  private destroyOptionComponent() {
    if (this.optionComponentRef === null) return

    this.applicationRef.detachView(this.optionComponentRef.hostView)
    this.optionComponentRef.destroy()
    this.optionComponentRef = null
    this.dropdownOpened.set(false)

    this.handleBlur()
  }

  getControlValue() {
    this.setDefaultValue()

    if (
      this.config.fieldMode === "float" &&
      ((this.multiple() && this.value.length === 0) ||
        (!this.multiple() && this.value === "")) &&
      !this.focused()
    )
      return ""

    if (this.loading()) return this.loadingPlaceholder()

    if (!this.multiple()) {
      if (this.value === null || this.value === undefined || this.value === "")
        return this.placeholder()

      const item = this.options().find(
        (x: any) => x[this.valueKey()] === this.value
      )

      return item ? item[this.labelKey()] : this.placeholder()
    } else {
      if (this.value.length === 0) return this.placeholder()

      const values: string[] = []
      for (const valueKey of this.value) {
        const item = this.options().find(
          (x: any) => x[this.valueKey()] === valueKey
        )
        if (item) {
          values.push(item[this.labelKey()])
        }
      }

      return values.join(", ")
    }
  }

  setDefaultValue() {
    if (this.value === null || this.value === undefined) {
      this.value = this.multiple() ? [] : ""
      this.onChangeFn(this.value)
    }
  }

  handleItemSelected(value: any) {
    this.value = value
    this.onChangeFn(this.value)
    this.onSelect.emit(this.value)
  }

  handleClickOutside() {
    this.dropdownOpened.set(false)
    this.destroyOptionComponent()
  }
}
