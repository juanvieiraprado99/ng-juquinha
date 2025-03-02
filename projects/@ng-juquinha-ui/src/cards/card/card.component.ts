import { NgClass, NgStyle } from "@angular/common"
import { Component, input, output } from "@angular/core"
import { BadgeComponent } from "../../badges/badge/badge.component"
import { IconComponent } from "../../icons/icon/icon.component"

@Component({
  selector: "juquinha-card",
  standalone: true,
  imports: [NgClass, NgStyle, IconComponent, BadgeComponent],
  host: {
    "[class.clickable]": "clickable()",
  },
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.scss",
})
export class CardComponent {
  imageSrc = input<string>()
  imageAlt = input<string>()
  icon = input<string>()
  iconSize = input("40")
  iconColor = input("#000")
  badgeLabel = input<string>()
  badgeColor = input("var(--juquinha-primary-color)")
  badgeTextColor = input("var(--juquinha-neutral-color-0)")
  badgeIcon = input("circle")
  badgeIconSize = input("8")
  title = input<string>()
  subtitle = input<string>()
  content = input<string>()
  totalLines = input(3)
  clickable = input(true)

  onClick = output()

  handleClick() {
    if (this.clickable()) this.onClick.emit()
  }
}
