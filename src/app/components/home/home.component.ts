import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  router: any;

  // Método para navegar a la página de registro
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  openRegisterModal() {
    throw new Error('Method not implemented.');
  }
}
