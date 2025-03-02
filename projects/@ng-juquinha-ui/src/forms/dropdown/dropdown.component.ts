import { NgClass } from "@angular/common"
import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  type ComponentRef,
  type ElementRef,
  type EmbeddedViewRef,
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
  implements ControlValueAccessor
{
  private readonly componentFactoryResolver = inject(ComponentFactoryResolver)
  private applicationRef = inject(ApplicationRef)

  options = input<any[]>([])
  labelKey = input("label")
  valueKey = input("value")
  showClear = input(true)
  multiple = input(false)
  search = input(false, { transform: value => value === "true" })
  searchLabel = input("")
  loading = input(false)
  virtualScroll = input(false)
  showSelectAll = input(false)
  emptyMessage = input("Nenhuma opção foi encontrada")
  loadingPlaceholder = input("Carregando opções...")
  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("top")

  onSelect = output<any>()
  onClear = output<void>()

  dropdownOpened = signal(false)

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
      for (let valueKey of this.value) {
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
