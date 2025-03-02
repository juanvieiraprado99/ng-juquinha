import type { severity } from "./toast.types"

export interface ToastMessage {
  id?: number
  title?: string
  detail?: string
  time?: number
  link?: string
  linkName?: string
  externalLink?: boolean
  severity?: severity
  onClick?: VoidFunction
  isLoading?: boolean
}
