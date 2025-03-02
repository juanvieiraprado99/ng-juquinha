import { Pipe, type PipeTransform } from "@angular/core"

@Pipe({ name: "fileSize", standalone: true })
export class FileSizePipe implements PipeTransform {
  transform(bytes: number): string {
    if (Number.isNaN(bytes) || bytes === 0) return "0 Bytes"
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${Number.parseFloat((bytes / 1024 ** i).toFixed(2))} ${sizes[i]}`
  }
}
