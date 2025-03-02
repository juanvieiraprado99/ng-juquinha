import { NgClass } from "@angular/common"
import { Component, computed, input, output } from "@angular/core"
import { IconComponent } from "../../icons/icon/icon.component"

@Component({
  selector: "juquinha-paginator",
  standalone: true,
  imports: [NgClass, IconComponent],
  templateUrl: "./paginator.component.html",
  styleUrl: "./paginator.component.scss",
})
export class PaginatorComponent {
  page = input.required<number>()
  totalPages = input.required<number>()
  showPages = input(3)

  onPageChanged = output<number>()

  renderPages = computed(() => {
    const pages: number[] = []
    for (let i = 1; i <= this.totalPages(); i++) {
      if (i < this.page() - 1 || pages.length > this.showPages() - 1) continue
      pages.push(i)
    }
    return pages
  })

  handlePageSelect(page: number) {
    if (page < 1 || page > this.totalPages()) return
    this.onPageChanged.emit(page)
  }
}
