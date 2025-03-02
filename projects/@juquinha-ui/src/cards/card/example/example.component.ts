import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CardComponent } from '../card.component';

@Component({
  selector: 'juquinha-example',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleComponent {
  imageSrc = input<string>();
  imageAlt = input<string>();
  icon = input<string>();
  iconSize = input('40');
  iconColor = input('#000');
  showBadge = input(false);
  badgeLabel = input<string>();
  badgeColor = input('var(--juquinha-primary-color)');
  badgeTextColor = input('var(--juquinha-neutral-color-0)');
  badgeIcon = input('circle');
  title = input<string>();
  subtitle = input<string>();
  content = input(
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore vero dignissimos nobis possimus, magnam inventore dolores! Expedita alias sint magni molestiae rerum atque placeat natus perferendis qui eveniet, non facere.'
  );
  totalLines = input(3);
  clickable = input(true);

  onClick = output();
}
