import {
  ApplicationRef,
  ComponentFactoryResolver,
  type ComponentRef,
  Directive,
  ElementRef,
  type EmbeddedViewRef,
  HostListener,
  Injector,
  type OnDestroy,
  inject,
  input,
} from "@angular/core"
import { TooltipComponent } from "./tooltip.component"
import type { position } from "./tooltip.types"

@Directive({
  selector: "[juquinhaTooltip]",
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  private readonly elementRef = inject(ElementRef)
  private readonly appRef = inject(ApplicationRef)
  private readonly componentFactoryResolver = inject(ComponentFactoryResolver)
  private readonly injector = inject(Injector)

  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("bottom")

  private componentRef: ComponentRef<any> | null = null

  @HostListener("mouseenter")
  onMouseEnter(): void {
    if (this.componentRef === null) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(TooltipComponent)

      this.componentRef = componentFactory.create(this.injector)

      this.appRef.attachView(this.componentRef.hostView)

      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement

      document.body.appendChild(domElem)

      this.setTooltipComponentProperties()
    }
  }

  private setTooltipComponentProperties() {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltipTitle = this.tooltipTitle()
      this.componentRef.instance.tooltipText = this.tooltipText()
      this.componentRef.instance.icon = this.tooltipIcon()
      this.componentRef.instance.tooltipPosition = this.tooltipPosition()

      const { left, right, top, bottom } =
        this.elementRef.nativeElement.getBoundingClientRect()

      switch (this.tooltipPosition()) {
        case "bottom": {
          this.componentRef.instance.left = Math.round(
            (right - left) / 2 + left
          )
          this.componentRef.instance.top = Math.round(bottom)
          break
        }
        case "top": {
          this.componentRef.instance.left = Math.round(
            (right - left) / 2 + left
          )
          this.componentRef.instance.top = Math.round(top)
          break
        }
        case "right": {
          this.componentRef.instance.left = Math.round(right)
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2)
          break
        }
        case "left": {
          this.componentRef.instance.left = Math.round(left)
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2)
          break
        }
      }
    }
  }

  @HostListener("mouseleave")
  onMouseLeave(): void {
    this.destroy()
  }

  ngOnDestroy(): void {
    this.destroy()
  }

  destroy(): void {
    if (this.componentRef !== null) {
      this.appRef.detachView(this.componentRef.hostView)
      this.componentRef.destroy()
      this.componentRef = null
    }
  }
}
