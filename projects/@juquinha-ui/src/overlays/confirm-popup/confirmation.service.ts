import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import type { Confirm } from "./confirm.model"

@Injectable({
  providedIn: "root",
})
export class ConfirmationService {
  private confirm$ = new BehaviorSubject<Confirm>({})

  getObservable(): Observable<Confirm> {
    return this.confirm$.asObservable()
  }

  confirm(confirm: Confirm): void {
    this.confirm$.next(confirm)
  }
}
