import { Directive, HostListener } from "@angular/core"

@Directive({
  selector: "[juquinhaOnlyNumbers]",
  standalone: true,
})
export class OnlyNumbersDirective {
  @HostListener("input", ["$event"]) onInputChange(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement
    const initialValue = input.value

    input.value = initialValue.replace(/[^0-9]*/g, "")

    if (initialValue !== input.value) {
      event.stopPropagation()
    }
  }

  @HostListener("paste", ["$event"]) onPaste(event: ClipboardEvent) {
    const clipboardData = event.clipboardData || (window as any).clipboardData
    const pastedText = clipboardData.getData("text")

    const numbersOnly = pastedText.replace(/[^0-9]/g, "")

    if (pastedText !== numbersOnly) {
      event.preventDefault()
    }
  }
}
