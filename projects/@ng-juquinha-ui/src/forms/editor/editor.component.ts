import { NgClass } from "@angular/common"
import {
  Component,
  type ElementRef,
  HostListener,
  ViewChild,
  forwardRef,
  input,
} from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import { IconComponent } from "../../icons/icon/icon.component"
import { TooltipDirective } from "../../tooltips/tooltip/tooltip.directive"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FieldContainerComponent } from "../field-container/field-container.component"
import { EDITOR_COMMANDS } from "./editor.constants"

@Component({
  selector: "juquinha-editor",
  standalone: true,
  imports: [IconComponent, TooltipDirective, FieldContainerComponent, NgClass],
  templateUrl: "./editor.component.html",
  styleUrl: "./editor.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true,
    },
  ],
})
export class EditorComponent
  extends ControlBase
  implements ControlValueAccessor
{
  @ViewChild("el") divElement!: ElementRef<HTMLDivElement>
  commands = EDITOR_COMMANDS

  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("top")

  override writeValue(obj: any) {
    this.onTouchedFn()
    setTimeout(() => {
      if (!obj) return
      this.value = obj
      this.divElement.nativeElement.innerHTML = this.value
    })
  }

  applyCommand(value: string) {
    if (value === "link") {
      this.link()
      return
    }

    this.divElement.nativeElement.focus()
    document.execCommand(value)
  }

  private link() {
    this.divElement.nativeElement.focus()
    document.execCommand(
      "createlink",
      false,
      prompt("Enter a URL:", "http://") || ""
    )
  }

  alterFont(value: Event) {
    const selectedValue = (value.target as HTMLSelectElement).value
    document.execCommand("fontSize", false, parseInt(selectedValue) as any)
  }

  @HostListener("input")
  handleChange() {
    if (!this.divElement?.nativeElement) return

    const value = this.divElement.nativeElement.innerHTML
    this.value = value === "<br>" ? "" : value
    this.onChangeFn(this.value)
    this.handleChanged()
    this.markControlAsTouched()
  }
}
