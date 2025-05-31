export type direction = "vertical" | "horizontal"

export enum FileType {
  ALL = "*",
  IMAGES = "images",
  DOCUMENTS = "documents",
  SPREADSHEETS = "spreadsheets",
}

export interface FileTypeConfig {
  extensions: string[]
  mimeTypes: string[]
  description: string
}

export const FILE_TYPE_MAP: Record<FileType, FileTypeConfig> = {
  [FileType.ALL]: {
    extensions: ["*"],
    mimeTypes: ["*/*"],
    description: "todos os arquivos",
  },
  [FileType.IMAGES]: {
    extensions: [".png", ".jpeg", ".jpg", ".gif", ".webp"],
    mimeTypes: [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/webp",
    ],
    description: "imagens (PNG, JPEG, JPG, GIF, WEBP)",
  },
  [FileType.DOCUMENTS]: {
    extensions: [".pdf", ".doc", ".docx", ".txt"],
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ],
    description: "documentos (PDF, DOC, DOCX, TXT)",
  },
  [FileType.SPREADSHEETS]: {
    extensions: [".xls", ".xlsx", ".csv"],
    mimeTypes: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ],
    description: "planilhas (XLS, XLSX, CSV)",
  },
}
