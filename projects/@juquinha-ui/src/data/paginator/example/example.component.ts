import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { PaginatorComponent } from '../paginator.component';

@Component({
  selector: 'juquinha-example',
  standalone: true,
  imports: [PaginatorComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  page = 0;
  totalPages = 0;
  showPages = 0;

  onPageChanged = output<number>();

  handleChangePage(page: number) {
    this.page = page;
  }
}
