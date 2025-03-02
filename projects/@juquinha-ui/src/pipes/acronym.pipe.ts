import { Pipe, type PipeTransform } from "@angular/core"

@Pipe({
  name: "acronym",
  standalone: true,
  pure: true,
})
export class AcronymPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    value = value.toUpperCase()

    if (value.includes(" ")) {
      const words = value.split(" ")
      if (words.length > 1) {
        value = words[0].split("")[0] + words[1].split("")[0]
        return value
      }
    }

    const size = args.find(x => {
      return x === "size"
    }) as string
    const chars = value.split("")

    if (size === "small") return chars[0]

    value = chars[0]
    if (chars.length > 1) value += chars[1]

    return value
  }
}
