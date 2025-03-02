import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from "@angular/core"
import { TooltipDirective } from "../tooltip.directive"

export type position = "bottom" | "top" | "left" | "right"

@Component({
  selector: "juquinha-example",
  standalone: true,
  imports: [TooltipDirective],
  templateUrl: "./example.component.html",
  styleUrl: "./example.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  tooltipTitle = input("")
  tooltipText = input("")
  tooltipIcon = input("")
  tooltipPosition = input<position>("bottom")

  positions = signal(["bottom", "top", "left", "right"])

  getPosition(position: string): "bottom" | "top" | "left" | "right" {
    return position as "bottom" | "top" | "left" | "right"
  }
}
