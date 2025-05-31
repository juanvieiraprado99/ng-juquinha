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
import { FILE_TYPE_MAP, FileType, type direction } from "./file.types"

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

  /**
   * @description
   * Define os tipos de arquivos que podem ser selecionados no campo de upload.
   *
   * Esta propriedade aceita dois formatos:
   *
   * 1. Um valor do enum `FileType`:
   *    - `FileType.ALL`: Todos os tipos de arquivos são aceitos (*)
   *    - `FileType.IMAGES`: Apenas arquivos de imagem (PNG, JPEG, JPG, GIF, WEBP)
   *    - `FileType.DOCUMENTS`: Arquivos de texto e documentos (PDF, DOC, DOCX, TXT)
   *    - `FileType.SPREADSHEETS`: Planilhas (XLS, XLSX, CSV)
   *
   * 2. Uma string personalizada contendo extensões ou MIME types separados por vírgula:
   *    - Extensões: começam com ponto (`.`), como `.pdf`, `.jpg`
   *    - MIME types: como `application/pdf`, `image/png`
   *
   * É possível combinar extensões e MIME types na mesma string:
   * - Ex: `.pdf,.jpg,image/png`
   *
   * @default FileType.ALL
   *
   * @exemplos
   * ```ts
   * // Todos os arquivos permitidos
   * accept = FileType.ALL;
   *
   * // Apenas imagens
   * accept = FileType.IMAGES;
   *
   * // Personalizado: PDF e imagens JPEG
   * accept = '.pdf,image/jpeg';
   *
   * // Personalizado: tipos MIME de documentos
   * accept = 'application/pdf,application/msword';
   * ```
   *
   * @observações
   * - Caso forneça um valor inválido ou com formatação incorreta, nenhum filtro será aplicado.
   * - Se desejar aceitar todos os arquivos, utilize `FileType.ALL`, `'*'` ou `'*'`.
   * - O filtro afeta tanto o seletor de arquivos do sistema quanto a validação posterior ao upload.
   */
  accept = input<FileType | string>(FileType.ALL)
  /**
   * @description
   * Define se é possível selecionar múltiplos arquivos no campo.
   */
  multiple = input(false)
  /**
   * @description
   * Define o tamanho máximo de um arquivo, o tamanho é definido em Mb:
   *
   * Exemplo:
   * - Valor padrão 5: O tamanho máximo de um arquivo por padrão é de 5Mb.
   */
  maxSize = input(5)
  /**
   * @description
   * Define a quantidade máxima de arquivos dentro do campo de arquivos, por padrão a quantidade é de 5 arquivos.
   */
  numberOfFiles = input(5)
  /**
   * @description
   * Define o formato do campo de arquivos, quando:
   *
   * - `horizontal`: Os arquivos colocados irão aparecer abaixo do campo.
   * - `vertical`: Os arquivos colocados irão aparecer do lado direito do campo.
   */
  direction = input<direction>("horizontal")
  /**
   * @description
   * Define se o arquivo colocado pode ser removido.
   */
  removable = input(true)
  /**
   * @description
   * Define se o botão de ação (ícone de ação) deve ser exibido ao lado de cada arquivo.
   */
  showAction = input(false)
  /**
   * @description
   * Ícone exibido no botão de ação, se `showAction` estiver habilitado.
   */
  actionIcon = input("information-circle")
  /**
   * @description
   * Propriedade que define o caminho do campo no objeto do arquivo usado para exibir a imagem.
   * Útil quando o valor não é um `File` nativo e sim um objeto com informações adicionais.
   */
  fileImgSrcProperty = input("url")
  /**
   * @description
   * Título exibido no tooltip associado ao campo, se fornecido.
   */
  tooltipTitle = input<string>()
  /**
   * @description
   * Texto explicativo exibido no tooltip associado ao campo, se fornecido.
   */
  tooltipText = input<string>()
  /**
   * @description
   * Ícone a ser exibido junto ao tooltip, caso desejado.
   * Pode ser um nome de ícone compatível com o sistema de ícones utilizado no projeto.
   */
  tooltipIcon = input<string>()
  /**
   * @description
   * Define a posição onde o tooltip será exibido em relação ao campo.
   *
   * Valores possíveis:
   * - `top`: Exibido no topo.
   * - `right`: Exibido no lado direito.
   * - `bottom`: Exibido abaixo.
   * - `left`: Exibido no lado esquerdo.
   */
  tooltipPosition = input<position>("top")

  /**
   * @description
   * Evento emitido quando o botão de ação de um arquivo é clicado.
   * O arquivo correspondente é emitido como payload.
   */
  onClickAction = output<any>()
  /**
   * @description
   * Evento emitido após o upload/seleção bem-sucedida de arquivos.
   * Emite o(s) arquivo(s) que foram adicionados com sucesso.
   */
  onAttached = output<any | any[]>()

  isDragging = signal(false)

  private getFileTypeConfig(): { acceptValue: string; fileTypeConfig: any } {
    const acceptInput = this.accept()

    if (Object.values(FileType).includes(acceptInput as FileType)) {
      const fileType = acceptInput as FileType
      const fileTypeConfig = FILE_TYPE_MAP[fileType]

      let acceptValue = ""

      if (fileType === FileType.ALL) {
        acceptValue = "*"
      } else {
        acceptValue = [
          ...fileTypeConfig.extensions.filter(ext => ext !== "*"),
          ...fileTypeConfig.mimeTypes.filter(mime => mime !== "*/*"),
        ].join(",")
      }

      return { acceptValue, fileTypeConfig }
    } else {
      const customTypes = (acceptInput as string)
        .split(",")
        .map(type => type.trim())
      const extensions = customTypes.filter(type => type.startsWith("."))
      const mimeTypes = customTypes.filter(
        type => type.includes("/") || type === "*"
      )

      const fileTypeConfig = {
        extensions,
        mimeTypes,
        description: customTypes.join(", "),
      }

      return { acceptValue: acceptInput as string, fileTypeConfig }
    }
  }

  getAcceptAttributeValue(): string {
    const { acceptValue } = this.getFileTypeConfig()
    return acceptValue
  }

  handleSelectFile(event: any) {
    const files =
      event.type === "drop" ? event.dataTransfer.files : event.target.files
    this.processFiles(files)
  }

  private processFiles(targetFiles: FileList) {
    let appendedFiles = this.value

    if (typeof appendedFiles !== "object") appendedFiles = []

    const { fileTypeConfig } = this.getFileTypeConfig()
    let hasErrors = false
    let validFilesCount = 0

    for (let i = 0; i < targetFiles.length; i++) {
      const file: File = targetFiles[i]
      let isValidFile = true

      if (this.accept() !== FileType.ALL && this.accept() !== "*") {
        const isValidType = this.validateFileType(file, fileTypeConfig)
        if (!isValidType) {
          this.showError(
            `O arquivo "${file.name}" não é um tipo permitido.\nTipos aceitos: ${fileTypeConfig.description}`
          )
          hasErrors = true
          isValidFile = false
        }
      }

      if (this.fileAlreadyAppended(appendedFiles, file)) {
        continue
      }

      if (isValidFile && this.maxSize() > 0) {
        const sizeInMb: number = file.size / 1024 / 1024
        if (sizeInMb > this.maxSize()) {
          this.showError(
            `O arquivo "${
              file.name
            }" ultrapassou o limite de ${this.maxSize()}MB`
          )
          hasErrors = true
          isValidFile = false
        }
      }

      if (isValidFile) {
        if (this.multiple()) {
          if (appendedFiles.length < this.numberOfFiles()) {
            appendedFiles.push(file)
            validFilesCount++
          } else {
            this.showError(
              `O limite de ${this.numberOfFiles()} arquivos foi atingido.`
            )
            hasErrors = true
            break
          }
        } else {
          appendedFiles = [file]
          validFilesCount = 1
          break
        }
      }
    }

    this.value = appendedFiles
    this.onChangeFn(this.value)

    if (validFilesCount > 0) {
      this.onAttached.emit(appendedFiles)
    }
  }

  private validateFileType(file: File, fileTypeConfig: any): boolean {
    const fileType = file.type
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`

    return (
      fileTypeConfig.extensions.some(
        (ext: any) => ext === "*" || ext.toLowerCase() === fileExtension
      ) ||
      fileTypeConfig.mimeTypes.some((mime: any) => {
        if (mime === fileType) return true

        if (mime.endsWith("/*")) {
          const mimeCategory = mime.split("/")[0]
          const fileCategory = fileType.split("/")[0]
          return mimeCategory === fileCategory
        }

        return mime === "*/*"
      })
    )
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
    if (!this.formGroup) {
      alert(errorMessage)
      return
    }

    setTimeout(() => {
      this.control?.markAsTouched()

      this.formControlService.setControlError(
        this.formGroup,
        this.formControlName() as string,
        errorMessage
      )
    })
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
    const imageTypes = ["png", "webp", "jpeg", "jpg", "gif"]

    return imageTypes.includes(extension)
  }

  getFileTypeDescription(): string {
    const { fileTypeConfig } = this.getFileTypeConfig()
    return fileTypeConfig.description
  }
}
