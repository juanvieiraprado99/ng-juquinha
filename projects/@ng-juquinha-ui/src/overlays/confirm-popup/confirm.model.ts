export interface Confirm {
  icon?: string
  message?: string
  target?: any
  acceptLabel?: string
  rejectLabel?: string
  acceptIcon?: string
  rejectIcon?: string
  accept?: () => void
  reject?: () => void
}

export interface ConfirmPosition {
  top: number
  left: number
}
