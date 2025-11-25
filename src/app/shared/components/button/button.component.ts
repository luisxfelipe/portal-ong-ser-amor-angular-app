import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export type ButtonVariant = 'primary' | 'accent' | 'warn';

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
  type = input<'button' | 'submit' | 'reset'>('button');
  color = input<ButtonVariant>('primary');
  icon = input<string>('');
  size = input<'sm' | 'md' | 'lg'>('md');
  fullWidth = input<boolean>(false);
}
