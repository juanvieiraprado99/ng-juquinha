import { ChangeDetectionStrategy, Component, input } from "@angular/core"
import { IconComponent } from "../../icons/icon/icon.component"

@Component({
  selector: "juquinha-hint-text",
  standalone: true,
  imports: [IconComponent],
  templateUrl: "./hint-text.component.html",
  styleUrl: "./hint-text.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintTextComponent {
  hintText = input.required()
}
