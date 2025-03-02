import { DatePipe } from "@angular/common"
import { ChangeDetectionStrategy, Component } from "@angular/core"
import { IconComponent } from "../../../icons/icon/icon.component"
import { TableComponent } from "../table.component"

interface exampleObject {
  value: any
  object?: exampleObject
}

@Component({
  selector: "juquinha-example",
  standalone: true,
  imports: [TableComponent, DatePipe, IconComponent],
  templateUrl: "./example.component.html",
  styleUrl: "./example.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  clickable = false
  objectList: exampleObject[] = []
  headers = ["Nome", "Fundado em", "Total de hospedes", "Ações"]
}
