import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../../buttons/button/button.component';
import { ModalComponent } from '../modal.component';
import { footerMode, size } from '../modal.types';

@Component({
  selector: 'juquinha-example',
  standalone: true,
  imports: [RouterOutlet, ModalComponent, ButtonComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  show = input(false);
  showClose = input(true);
  headerIcon = input<string>();
  headerIconColor = input('var(--juquinha-primary-color)');
  title = input<string>();
  subtitle = input<string>();
  showDivider = input(true);
  confirmButtonLabel = input('Confirmar');
  cancelButtonLabel = input('Cancelar');
  footerLink = input<string>();
  preventEscapeKey = input(false);
  loading = input(false);

  onCloseModal = output<void>();
  onClickConfirm = output<void>();
  onClickCancel = output<void>();

  showModal = false;

  size: size = 'medium';
  footerText = '';
  footerMode: footerMode = 'default';

  handleShowModal(
    footerMode: string,
    footerText: string = '',
    size: string = 'medium'
  ) {
    this.footerMode = footerMode as footerMode;
    this.size = size as size;
    this.footerText = footerText;

    this.switchShowModal();
  }

  switchShowModal() {
    this.showModal = !this.showModal;
  }

  onCancel() {
    alert('Reject button has been clicked!');
  }

  onConfirm() {
    alert('Confirm button has been clicked!');
  }
}
