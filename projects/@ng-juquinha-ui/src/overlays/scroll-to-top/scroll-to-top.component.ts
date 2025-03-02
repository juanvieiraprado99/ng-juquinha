import { Component, input, output } from "@angular/core"
import { ButtonComponent } from "../../buttons/button/button.component"

@Component({
  selector: "juquinha-scroll-to-top",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./scroll-to-top.component.html",
  styleUrl: "./scroll-to-top.component.scss",
})
export class ScrollToTopComponent {
  elementId = input<string>()

  onClick = output()

  scroll() {
    if (this.elementId()) this.scrollToElement()
    else this.scrollToTop()
    this.onClick.emit()
  }

  private scrollToElement() {
    const element = document.getElementById(this.elementId()!)
    element?.scrollIntoView()
  }

  private scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}
