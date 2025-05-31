import { NgClass, NgStyle } from "@angular/common"
import { Component, computed, inject, input } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"
import { ConfigService } from "../../services/config.service"
import type { Icon } from "./icon.model"

import { ICONS as JUQUINHA_ICONS } from "./themes/juquinha.data"

@Component({
  selector: "juquinha-icon",
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: "./icon.component.html",
  styleUrl: "./icon.component.scss",
})
export class IconComponent {
  private readonly sanitizer = inject(DomSanitizer)
  private readonly configService = inject(ConfigService)

  private readonly config = this.configService.getConfigAsReadonly()

  name = input.required()
  size = input("24")
  color = input("#000")
  rotate = input(false)
  rotateSpeed = input("1.25s")

  icons = computed(() => {
    switch (this.config().iconTheme) {
      case "juquinha":
        return JUQUINHA_ICONS
      default:
        return []
    }
  })

  iconHTML = computed(() => {
    let icon: Icon | undefined = this.icons().find(
      (x: Icon) => x.identifier === this.name()
    )
    if (!icon) {
      icon = this.icons().find((x: Icon) => x.identifier === "select-box")
      console.warn("O ícone informado não foi encontrado:", this.name())
      console.warn('Usando o ícone padrão "select-box" como fallback.')
    }

    const iconHTML = this.replaceIconProperties(icon!.content)

    return this.sanitizer.bypassSecurityTrustHtml(iconHTML)
  })

  private replaceIconProperties(iconHTML: string) {
    return iconHTML
      .replaceAll("{{width}}", this.size())
      .replaceAll("{{height}}", this.size())
      .replaceAll("{{color}}", this.color())
  }
}
