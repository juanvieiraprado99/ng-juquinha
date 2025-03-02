import { Pipe, type PipeTransform } from "@angular/core"
import type { Header } from "./table.model"

@Pipe({
  name: "isHeaderObject",
  standalone: true,
  pure: true,
})
export class IsHeaderObjectPipe implements PipeTransform {
  transform(header: string | Header): header is Header {
    return typeof header !== "string" && (header as Header).label !== undefined
  }
}
