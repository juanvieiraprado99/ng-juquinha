import { UpperCasePipe } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core"
import { FormsModule } from "@angular/forms"
import { ButtonComponent } from "../../../buttons/button/button.component"
import { ConfigService } from "../../../services/config.service"
import { IconComponent } from "../icon.component"
import type { Icon } from "../icon.model"
import { ICONS as JUQUINHA_ICONS } from "../themes/juquinha.data"

@Component({
  selector: "juquinha-example",
  standalone: true,
  imports: [IconComponent, FormsModule, UpperCasePipe, ButtonComponent],
  templateUrl: "./example.component.html",
  styleUrl: "./example.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  private readonly configService = inject(ConfigService)
  readonly config = this.configService.getConfigAsReadonly()

  rotate = false
  color = "#000"
  size = "28"
  rotateSpeed = "1.25s"

  icons = computed<Icon[]>(() => {
    switch (this.config().iconTheme) {
      case "juquinha":
        return JUQUINHA_ICONS
      default:
        return []
    }
  })

  handleSwitchIconTheme() {
    this.configService.setConfiguration({
      iconTheme:
        this.config().iconTheme === "juquinha" ? "juquinha" : "juquinha",
    })
  }
}
