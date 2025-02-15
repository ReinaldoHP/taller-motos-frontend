import { Component, signal } from '@angular/core';
import { AuthService } from './services/auth.service'; // Importa AuthService
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule], // Asegúrate de importar RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  [x: string]: any;
  title = 'Taller de Motos Reinaldo';
  isAuthenticated = signal(false); // Estado de autenticación

  constructor(private authService: AuthService) {
    // Actualiza el estado de autenticación al iniciar la aplicación
    this.isAuthenticated.set(this.authService.isAuthenticated());
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isAuthenticated.set(false);
        console.log('Sesión cerrada correctamente.');
        this['router'].navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      },
    });
  }


}
