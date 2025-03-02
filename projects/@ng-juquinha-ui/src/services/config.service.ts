import { Injectable, signal } from "@angular/core"
import type { JuquinhaConfig } from "./config.model"

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  private readonly defaultConfig = signal<JuquinhaConfig>({
    fieldMode: "static",
    iconTheme: "juquinha",
  })

  private config = signal<JuquinhaConfig>(this.defaultConfig())

  getConfigAsReadonly() {
    return this.config.asReadonly()
  }

  getConfig() {
    return this.getValue()
  }

  setConfiguration(config: JuquinhaConfig) {
    const juquinhaConfig: JuquinhaConfig = {
      ...this.getValue(),
      ...config,
    }
    this.setValue(juquinhaConfig)
  }

  private getValue() {
    return this.config()
  }

  private setValue(config: JuquinhaConfig) {
    this.config.set(config)
  }
}
