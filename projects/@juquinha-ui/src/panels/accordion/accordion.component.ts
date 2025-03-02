import { NgClass, NgStyle } from "@angular/common"
import {
  Component,
  HostBinding,
  computed,
  input,
  output,
  signal,
} from "@angular/core"
import { IconComponent } from "../../icons/icon/icon.component"
import { type AccordionStyles, defaultStyle } from "./accordion.model"
import type { size } from "./accordion.types"

@Component({
  selector: "juquinha-accordion",
  standalone: true,
  imports: [NgClass, IconComponent, NgStyle],
  templateUrl: "./accordion.component.html",
  styleUrl: "./accordion.component.scss",
})
export class AccordionComponent {
  icon = input<string>()
  title = input<string>()
  size = input<size>("medium")
  active = input(false, {
    transform: (value: boolean) => {
      this.bodyActive.set(value)
      return value
    },
  })
  styles = input<AccordionStyles>(defaultStyle)

  onChangeState = output<boolean>()

  bodyActive = signal(false)
  accordionClasses = computed(() => `accordion--size-${this.size()}`)
  iconSize = computed(() => {
    return {
      small: "18px",
      medium: "20px",
      large: "24px",
    }[this.size()]
  })

  @HostBinding("attr.style")
  get cssVars() {
    return `
    --juquinha-component-accordion-header-hover-background-color: ${
      this.styles().header.hoverBackgroundColor
    }
  `
  }

  switchActive() {
    this.bodyActive.set(!this.bodyActive())
    this.onChangeState.emit(this.bodyActive())
  }
}
