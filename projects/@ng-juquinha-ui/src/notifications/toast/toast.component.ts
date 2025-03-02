import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core"
import { CardComponent } from "./card/card.component"
import { fadeInOut } from "./toast.animation"
import { ToastService } from "./toast.service"

@Component({
  selector: "juquinha-toast",
  standalone: true,
  imports: [CardComponent],
  templateUrl: "./toast.component.html",
  styleUrl: "./toast.component.scss",
  animations: [fadeInOut],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  private readonly toastService = inject(ToastService)

  messages = computed(() => {
    const currentMessages = this.toastService.messages()
    return currentMessages ? [...currentMessages].reverse() : []
  })

  handleRemove(messageId: number) {
    if (messageId !== undefined && messageId !== null) {
      this.toastService.removeById(messageId)
    }
  }

  handleClick(messageId: number) {
    if (messageId === undefined || messageId === null) return

    const message = this.messages().find(x => x.id === messageId)

    if (!message || !message.onClick) return
    message.onClick()
  }
}
