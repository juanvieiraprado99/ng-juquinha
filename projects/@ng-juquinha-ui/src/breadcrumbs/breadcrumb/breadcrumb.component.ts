import { NgClass } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from "@angular/core"
import { Router } from "@angular/router"
import { IconComponent } from "../../icons/icon/icon.component"
import type { BreadcrumbItem } from "./breadcrumb-item.model"

@Component({
  selector: "juquinha-breadcrumb",
  standalone: true,
  imports: [NgClass, IconComponent],
  templateUrl: "./breadcrumb.component.html",
  styleUrl: "./breadcrumb.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  private readonly router = inject(Router)

  breadcrumbItems = input<BreadcrumbItem[]>()
  lastIsCurrent = input(true)

  handleClickItem(event: Event, link: string | undefined) {
    event.preventDefault()
    if (link) this.router.navigate([link])
  }
}
