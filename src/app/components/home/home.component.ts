import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [], // Asegúrate de importar CommonModule si usas directivas como *ngIf
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  /**
   * Navega a la página de registro.
   */
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  /**
   * Abre un modal de registro (si se implementa en el futuro).
   */
  openRegisterModal(): void {
    console.warn('El método openRegisterModal aún no está implementado.');
  }
}
