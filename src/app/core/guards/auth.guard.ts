import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificamos se o usuário está logado olhando o Signal
  const isLogged = !!authService.currentUser();

  if (isLogged) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
