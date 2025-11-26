import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type ButtonVariant = 'flat' | 'stroked' | 'basic';
export type ButtonColor = 'primary' | 'accent' | 'warn' | 'basic';
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
  },
})
export class ButtonComponent {
  label = input.required<string>();

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
