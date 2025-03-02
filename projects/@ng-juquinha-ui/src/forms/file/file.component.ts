import { NgStyle } from "@angular/common"
import {
  Component,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from "@angular/core"
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms"
import { ButtonComponent } from "../../buttons/button/button.component"
import { IconComponent } from "../../icons/icon/icon.component"
import { FileSizePipe } from "../../pipes/file.pipe"
import { ImageSrcPipe } from "../../pipes/image-src.pipe"
import type { position } from "../../tooltips/tooltip/tooltip.types"
import { ControlBase } from "../common/control-base"
import { FormControlService } from "../common/form-control.service"
import { LabelComponent } from "../label/label.component"
import type { direction } from "./file.types"

@Component({
  selector: "juquinha-file",
  standalone: true,
  imports: [
    NgStyle,
    ButtonComponent,
    FileSizePipe,
    IconComponent,
    LabelComponent,
    ImageSrcPipe,
  ],
  templateUrl: "./file.component.html",
  styleUrl: "./file.component.scss",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileComponent),
      multi: true,
    },
  ],
})
export class FileComponent extends ControlBase implements ControlValueAccessor {
  private readonly formControlService = inject(FormControlService)

  accept = input("*")
  multiple = input(true)
  maxSize = input(5)
  numberOfFiles = input(5)
  direction = input<direction>("horizontal")
  removable = input(true)
  showAction = input(true)
  actionIcon = input("information-circle")
  fileImgSrcProperty = input("url")
  tooltipTitle = input<string>()
  tooltipText = input<string>()
  tooltipIcon = input<string>()
  tooltipPosition = input<position>("top")

  onClickAction = output<void>()
  onAttached = output<any | any[]>()

  isDragging = signal(false)

  handleSelectFile(event: any) {
    const files =
      event.type === "drop" ? event.dataTransfer.files : event.target.files
    this.processFiles(files)
  }

  private processFiles(targetFiles: FileList) {
    let appendedFiles = this.value

    if (typeof appendedFiles !== "object") appendedFiles = []

    for (let i = 0; i < targetFiles.length; i++) {
      const file: File = targetFiles[i]
      if (this.fileAlreadyAppended(appendedFiles, file)) {
        continue
      }
      if (this.maxSize() > 0) {
        const sizeInMb: number = file.size / 1024 / 1024
        if (sizeInMb > this.maxSize()) {
          this.showError(
            `O arquivo ${file.name} ultrapassou o limite de ${this.maxSize()}MB`
          )
          return
        }
      }
      if (this.multiple()) {
        if (appendedFiles.length < this.numberOfFiles()) {
          appendedFiles.push(file)
        } else {
          this.showError(
            `O limite de ${this.numberOfFiles()} arquivos foi atingido.`
          )
          return
        }
      } else {
        appendedFiles = [file]
      }
    }

    this.value = appendedFiles
    this.onChangeFn(this.value)
    this.onAttached.emit(appendedFiles)
  }

  handleDragEnter(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (!this.disabled()) {
      this.isDragging.set(true)
    }
  }

  handleDragLeave(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.isDragging.set(false)
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (!this.disabled()) {
      event.dataTransfer!.dropEffect = "copy"
    }
  }

  handleDrop(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    this.isDragging.set(false)

    if (this.disabled()) return

    this.handleSelectFile(event)
  }

  private showError(errorMessage: string) {
    if (!this.formGroup) return

    this.control.markAsTouched()

    this.formControlService.setControlError(
      this.formGroup,
      this.formControlName() as string,
      errorMessage
    )
  }

  handleClickOpen() {
    if (this.disabled()) return
    const el = document.getElementById(this.id() ?? "") as HTMLInputElement
    el.click()
  }

  private fileAlreadyAppended(appendedFiles: File[], file: File) {
    const exists = appendedFiles.find(x => x.name === file.name)
    return exists !== undefined
  }

  remove(index: number) {
    const appendedFiles: File[] = this.value
    appendedFiles.splice(index, 1)
    this.value = appendedFiles
    this.onChangeFn(this.value)
  }

  handleClickAction(file: any) {
    this.onClickAction.emit(file)
  }

  isImage(file: any) {
    let fileUrl = file[this.fileImgSrcProperty()]
    if (!fileUrl) fileUrl = file.name

    const fileNameSplit = fileUrl.toLowerCase().split(".")
    const extension = fileNameSplit[fileNameSplit.length - 1]
    const imageTypes = ["png", "webp", "jpeg", "jpg"]

    return imageTypes.includes(extension)
  }
}
