import { NgClass } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  type OnInit,
  inject,
  input,
  output,
  signal,
} from "@angular/core"
import { ButtonComponent } from "../../buttons/button/button.component"
import { SkeletonComponent } from "../../loaders/skeleton/skeleton.component"
import { FilterTooltipComponent } from "../../overlays/filter-tooltip-table/filter-tooltip-table.component"
import { IsHeaderObjectPipe } from "./is-header-object.pipe"
import type { FilterResult, Header } from "./table.model"

@Component({
  selector: "juquinha-table",
  standalone: true,
  imports: [
    NgClass,
    ButtonComponent,
    FilterTooltipComponent,
    IsHeaderObjectPipe,
    SkeletonComponent,
  ],
  templateUrl: "./table.component.html",
  styleUrl: "./table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  private readonly elRef = inject(ElementRef)

  clickable = input(false)
  isLoading = input(false)
  loadingRows = input(4)
  headers = input<Header[] | string[]>([])

  onFiltered = output<FilterResult>()

  modalVisibility = signal<boolean[]>(
    new Array(this.headers.length).fill(false)
  )
  Array: any

  ngOnInit(): void {}

  @HostListener("window:click", ["$event"])
  onWindowClick(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.modalVisibility.set(new Array(this.headers.length).fill(false))
    }
  }

  openCloseModal(index: number) {
    const visibility = this.modalVisibility()
    visibility[index] = !visibility[index]
    this.modalVisibility.set([...visibility])
  }

  filterValue(thead: Header, event: any) {
    let filterObj = {}
    if (thead.filter) {
      const values = event.split(";")
      thead.filter.forEach((header, index) => {
        if (values[index] !== undefined) {
          header.value = values[index]
        } else {
          header.value = null
        }
        for (const thead of this.headers()) {
          if (typeof thead === "string" || !header) continue
          filterObj = {
            ...filterObj,
            [header.property]: header.value ?? null,
          }
        }
      })
      this.onFiltered.emit(filterObj)
    }
  }

  generateLoaders(): number[] {
    return Array.from({ length: this.loadingRows() }, (_, i) => i + 1)
  }
}
