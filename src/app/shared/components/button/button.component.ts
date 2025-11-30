import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type ButtonVariant = 'basic' | 'raised' | 'stroked' | 'flat' | 'icon';
export type ButtonColor = 'basic' | 'primary' | 'accent' | 'warn';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  host: {
    '[class.full-width]': 'fullWidth()',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.is-icon-btn]': 'variant() === "icon"',
  },
})
export class ButtonComponent {
  label = input<string>();

  loading = input<boolean>();
  disabled = input<boolean>();
  fullWidth = input<boolean>(false);
  icon = input<string>('');

  type = input<'button' | 'submit' | 'reset'>('button');

  variant = input<ButtonVariant>('flat');
  color = input<ButtonColor>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');

  materialColor = computed(() => {
    return this.color() === 'basic' ? undefined : this.color();
  });
}
