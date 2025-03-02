import type { Icon } from "./icon.model"
import { ICONS as JUQUINNHA_ICONS } from "./themes/juquinha.data"

export const ICONS: Icon[] = JUQUINNHA_ICONS

export const getIconsName = () => {
  const key = "identifier"
  const iconsData = ICONS.sort((a, b) => {
    return a[key].localeCompare(b[key])
  })
  const icons: string[] = [""]
  for (const icon of iconsData) {
    icons.push(icon.identifier)
  }

  return icons
}
