import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService); // Inyecta el servicio AuthService
  const router = inject(Router); // Inyecta el servicio Router

  if (authService.isAuthenticated()) {
    return true; // Permite el acceso a la ruta
  } else {
    router.navigate(['/home']); // Redirige al usuario a la página de inicio de sesión
    return false; // Cancela la navegación
  }
};
