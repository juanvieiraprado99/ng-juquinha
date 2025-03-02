import { NgStyle } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from "@angular/core"

@Component({
  selector: "juquinha-skeleton",
  standalone: true,
  imports: [NgStyle],
  templateUrl: "./skeleton.component.html",
  styleUrl: "./skeleton.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent {
  width = input("100%")
  height = input("20px")
  borderRadius = input("8px")
  backgroundColor = input("var(--juquinha-skeleton-background)")
  animationColor = input("var(--juquinha-skeleton-loading-animation-color)")
  opacity = input(0.15)

  id = `skeleton-${Math.floor(Math.random() * 99999999)}`

  @HostBinding("attr.style")
  public get cssVars() {
    return `
    --juquinha-component-skeleton-animation-color: ${this.animationColor()}
  `
  }
}
