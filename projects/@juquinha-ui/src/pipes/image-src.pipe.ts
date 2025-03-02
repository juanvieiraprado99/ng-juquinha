import { Pipe, type PipeTransform } from "@angular/core"

@Pipe({
  name: "imageSrc",
  standalone: true,
  pure: true,
})
export class ImageSrcPipe implements PipeTransform {
  transform(file: any, ...args: unknown[]): unknown {
    const fileImgSrcProperty: any = args[0]

    if (file[fileImgSrcProperty]) return file[fileImgSrcProperty]

    try {
      return URL.createObjectURL(file)
    } catch {
      return null
    }
  }
}
