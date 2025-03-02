import { ChangeDetectionStrategy, Component, input } from "@angular/core"
import { IconComponent } from "../../icons/icon/icon.component"
import type { mode } from "../common/common.types"

@Component({
  selector: "juquinha-icons",
  standalone: true,
  imports: [IconComponent],
  host: {
    "[class.disabled]": "disabled()",
    "[class.float]": 'mode() === "float"',
  },
  templateUrl: "./icons.component.html",
  styleUrl: "./icons.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {
  iconLeft = input<string>()
  iconRight = input<string>()
  disabled = input(false)
  mode = input<mode>("static")
}
