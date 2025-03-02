import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'juquinha-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  label = input<string>();
  maxValue = input(100);
  overValue = input(false);
  value = input(0);

  currentValue = computed(() => {
    let percentage = (this.value() * 100) / this.maxValue();

    if (!this.overValue())
      if (percentage > 100) percentage = 100;
      else if (percentage < 0) percentage = 0;

    return percentage;
  });
}
