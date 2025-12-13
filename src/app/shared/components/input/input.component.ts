import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

type InputType = 'text' | 'email' | 'password' | 'number' | 'date';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  // Injeção do Controle do Pai (formControlName)
  ngControl = inject(NgControl, { optional: true, self: true });

  // Inputs
  label = input.required<string>();
  placeholder = input<string>('');
  type = input<InputType>('text');

  // Controle interno
  value: any = '';
  isDisabled = false;

  // Controle de Senha (Olhinho)
  hidePassword = signal(true);

  constructor() {
    // Conecta este componente ao sistema de formulários do Angular
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (!this.ngControl) {
      console.warn(
        'InputComponent precisa ser usado dentro de um formulário ou com formControl'
      );
    }
  }

  // --- MÉTODOS DO ControlValueAccessor ---

  // chamado quando o valor muda no código
  writeValue(value: any): void {
    this.value = value;
  }

  // Funções de callback para avisar o Angular
  onChange = (value: any) => {};
  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // --- LÓGICA INTERNA ---

  // Chamado quando o usuário digita no input
  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(target.value); // Avisa o formulário pai
  }

  // Lógica para alternar visibilidade da senha
  togglePassword(event: MouseEvent) {
    event.stopPropagation(); // Evita focar o input ao clicar no botão
    this.hidePassword.update((value) => !value);
  }

  // --- TRATAMENTO DE ERROS ---
  getErrorMessage(): string {
    if (!this.ngControl || !this.ngControl.errors) return '';

    const errors = this.ngControl.errors;

    if (errors['required']) return 'Campo obrigatório';
    if (errors['email']) return 'E-mail inválido';
    if (errors['minlength']) {
      return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
    }

    return 'Campo inválido';
  }
}
