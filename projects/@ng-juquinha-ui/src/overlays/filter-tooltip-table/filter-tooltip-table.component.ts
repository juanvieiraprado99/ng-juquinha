import { NgClass } from "@angular/common"
import {
  ChangeDetectionStrategy,
  Component,
  type OnInit,
  inject,
  input,
  output,
} from "@angular/core"
import {
  FormBuilder,
  type FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms"
import type { Header } from "../../data/table/table.model"
import { DropdownComponent, InputComponent } from "../../public-api"

@Component({
  selector: "juquinha-filter-tooltip-table",
  standalone: true,
  imports: [
    NgClass,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    DropdownComponent,
  ],
  templateUrl: "./filter-tooltip-table.component.html",
  styleUrl: "./filter-tooltip-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterTooltipComponent implements OnInit {
  visible = input(false)
  last = input(false)
  headers = input<Header>()

  valueEmitter = output<any>()

  private readonly formBuilder = inject(FormBuilder)

  public form: FormGroup = this.formBuilder.group({})

  ngOnInit(): void {
    this.headers()?.filter?.forEach((_, index) => {
      const controlName = `control${index}`
      this.form.addControl(controlName, this.formBuilder.control(""))
    })
  }

  public onEmit(controlName: string) {
    if (this.hasMultipleControls()) {
      const formObj: string[] =
        this.headers()?.filter?.map(
          (_, index) => this.form.controls[`control${index}`].value
        ) || []
      let resultString = formObj.join(";")

      if (this.hasMultipleControls()) resultString = formObj.join(";")

      this.valueEmitter.emit(resultString ?? formObj)
    } else {
      this.valueEmitter.emit(this.form.controls[controlName].value)
    }
  }

  private hasMultipleControls() {
    return Object.keys(this.form.controls).length > 1
  }
}
