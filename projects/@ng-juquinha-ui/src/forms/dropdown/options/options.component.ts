import { NgClass, NgStyle } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  type ElementRef,
  HostListener,
  NgZone,
  type OnInit,
  ViewChild,
  inject,
  output,
  signal,
} from "@angular/core"
import { FormsModule } from "@angular/forms"
import { IconComponent } from "../../../icons/icon/icon.component"
import { CheckboxComponent } from "../../checkbox/checkbox.component"
import { InputComponent } from "../../input/input.component"

const ITEM_HEIGHT = 40
const VISIBLE_ITEMS = 5
const BUFFER_ITEMS = 0

@Component({
  selector: "juquinha-options",
  standalone: true,
  imports: [
    IconComponent,
    NgClass,
    NgStyle,
    InputComponent,
    FormsModule,
    CheckboxComponent,
  ],
  templateUrl: "./options.component.html",
  styleUrl: "./options.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent implements OnInit {
  private readonly ngZone = inject(NgZone)

  options: any[] = []
  value: any = ""
  valueKey = "value"
  labelKey = "label"
  multiple = false
  emptyMessage = ""
  filteredOptions = signal<any[]>([])
  search = false
  showSelectAll = false
  selectAll = false
  searchLabel = ""
  filteredText = ""
  selectedIndex = -1
  enableVirtualScroll = false

  visibleItems = signal<any[]>([])
  startIndex = signal(0)
  endIndex = signal(VISIBLE_ITEMS)
  scrollTop = 0
  containerHeight = VISIBLE_ITEMS * ITEM_HEIGHT
  totalHeight = 0
  scrollListener: any = null

  buttonElementRef: ElementRef | null = null
  width = 0
  left = 0
  top = 0

  onItemSelected = output<any>()
  onClickOutside = output()
  onEndOfListReached = output()

  @ViewChild("optionsContainer") private optionsRef!: ElementRef
  @ViewChild("optionsScroller") private scrollerRef!: ElementRef
  @ViewChild("optionsItems") private list!: ElementRef
  @ViewChild("search") private searchRef!: ElementRef
  @ViewChild("selectAllContainer") private selectAllRef!: ElementRef
  @ViewChild("endMarker") private endMarkerRef!: ElementRef

  @HostListener("window:click", ["$event"])
  clickEventListener(event: Event) {
    const target = event.target as HTMLElement

    const clickedInsideComponent =
      this.buttonElementRef?.nativeElement.contains(target) ||
      this.optionsRef?.nativeElement.contains(target) ||
      this.searchRef?.nativeElement.contains(target) ||
      this.selectAllRef?.nativeElement.contains(target)

    if (clickedInsideComponent) {
      return
    }

    this.onClickOutside.emit()
  }

  @HostListener("window:keydown", ["$event"])
  handleKeyDown(event: KeyboardEvent) {
    if (
      this.filteredOptions().length === 0 &&
      event.key !== "Escape" &&
      event.key !== "Tab"
    )
      return

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        this.moveSelection(1)
        break
      case "ArrowUp":
        event.preventDefault()
        this.moveSelection(-1)
        break
      case "Enter":
        event.preventDefault()
        if (
          this.selectedIndex >= 0 &&
          this.selectedIndex < this.filteredOptions().length
        ) {
          const selectedItem = this.filteredOptions()[this.selectedIndex]
          if (this.multiple) {
            this.addOrRemoveItem(selectedItem)
          } else {
            this.selectItem(selectedItem)
            this.selectedIndex = -1
            this.onClickOutside.emit()
          }
        }
        break
      case "Home":
        event.preventDefault()
        this.selectedIndex = 0
        this.scrollToIndex(0)
        break
      case "End":
        event.preventDefault()
        this.selectedIndex = this.filteredOptions().length - 1
        this.scrollToIndex(this.selectedIndex)
        break
      case "PageUp":
        event.preventDefault()
        this.moveSelection(-VISIBLE_ITEMS)
        break
      case "PageDown":
        event.preventDefault()
        this.moveSelection(VISIBLE_ITEMS)
        break
      case "Escape":
      case "Tab":
        event.preventDefault()
        this.onClickOutside.emit()
        break
    }
  }

  ngOnInit(): void {
    if (this.buttonElementRef == null) {
      throw new Error(
        "buttonElementRef is required. Please provide a reference to the button element."
      )
    }

    const { left, bottom, width } =
      this.buttonElementRef.nativeElement.getBoundingClientRect()

    this.width = width
    this.left = Math.round(left)
    this.top = Math.round(bottom) + 8 + window.scrollY

    this.filteredOptions.set(this.options)
    this.updateVisibleItems()

    this.ngZone.runOutsideAngular(() => {
      this.scrollListener = this.handleScroll.bind(this)
      this.scrollerRef?.nativeElement.addEventListener(
        "scroll",
        this.handleScroll.bind(this),
        { passive: true }
      )
      this.updateVisibleItems()
    })
  }

  ngOnDestroy(): void {
    if (this.scrollListener && this.scrollerRef?.nativeElement) {
      this.scrollerRef?.nativeElement.removeEventListener(
        "scroll",
        this.scrollListener
      )
    }
  }

  handleScroll(event: Event): void {
    const element = event.target as HTMLElement
    this.scrollTop = element.scrollTop

    window.requestAnimationFrame(() => {
      this.ngZone.run(() => {
        this.updateVisibleItemsFromScroll()
      })
    })
  }

  updateVisibleItemsFromScroll(): void {
    if (!this.enableVirtualScroll) return

    const start = Math.max(
      0,
      Math.floor(this.scrollTop / ITEM_HEIGHT) - BUFFER_ITEMS
    )
    const end = Math.min(
      start + VISIBLE_ITEMS + BUFFER_ITEMS * 2,
      this.filteredOptions().length
    )

    const totalVisibleItems = Math.max(VISIBLE_ITEMS, end - start)

    this.startIndex.set(start)
    this.endIndex.set(start + totalVisibleItems)
    this.updateVisibleItems()
  }

  updateVisibleItems(): void {
    if (!this.enableVirtualScroll) {
      this.visibleItems.set(this.filteredOptions())
      this.totalHeight = this.filteredOptions().length * ITEM_HEIGHT
      return
    }

    const start = this.startIndex()
    const end = this.endIndex()

    const items = this.filteredOptions().slice(start, end)

    this.visibleItems.set(items)

    this.totalHeight = this.filteredOptions().length * ITEM_HEIGHT
  }

  scrollToIndex(index: number): void {
    if (!this.scrollerRef?.nativeElement || !this.enableVirtualScroll) return

    const scrollTop = index * ITEM_HEIGHT
    this.scrollerRef.nativeElement.scrollTop = scrollTop

    this.scrollTop = scrollTop
    this.updateVisibleItemsFromScroll()
  }

  private moveSelection(direction: number) {
    this.selectedIndex += direction

    if (this.selectedIndex < 0) {
      this.selectedIndex = 0
    } else if (this.selectedIndex >= this.filteredOptions().length) {
      this.selectedIndex = this.filteredOptions().length - 1
    }

    this.scrollToIndex(this.selectedIndex)
  }

  addOrRemoveItem(item: any) {
    const itemValue = item[this.valueKey]

    if (!Array.isArray(this.value)) this.value = []

    const index = this.value.indexOf(itemValue)

    if (index === -1) {
      this.value.push(itemValue)
    } else {
      this.value.splice(index, 1)
    }

    if (this.value.length < this.options.length) {
      this.selectAll = false
    }

    this.onItemSelected.emit(this.value)
  }

  selectItem(item: any) {
    const itemValue = item[this.valueKey]

    if (this.multiple) {
      this.addOrRemoveItem(item)
    } else {
      this.value = itemValue
      this.selectedIndex = this.filteredOptions().findIndex(
        option => option[this.valueKey] === itemValue
      )
      this.onItemSelected.emit(this.value)
      this.onClickOutside.emit()
    }
  }

  handleFilteredItems() {
    this.filteredOptions.set(
      this.options.filter(option =>
        option[this.labelKey]
          .toLowerCase()
          .includes(this.filteredText.toLowerCase())
      )
    )
    this.selectedIndex = -1
    this.startIndex.set(0)
    this.endIndex.set(VISIBLE_ITEMS)
    this.updateVisibleItems()

    if (this.scrollerRef?.nativeElement) {
      this.scrollerRef.nativeElement.scrollTop = 0
    }
  }

  getItemIndex(index: number): number {
    return this.startIndex() + index
  }

  handleToggleSelectAll() {
    if (this.selectAll) {
      this.value = this.options.map(option => option[this.valueKey])
    } else {
      this.value = []
    }
    this.onItemSelected.emit(this.value)
  }
}
