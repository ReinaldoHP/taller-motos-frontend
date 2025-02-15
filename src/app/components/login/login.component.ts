import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // No necesitas FormsModule si usas Reactive Forms
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage = signal(''); // Usamos signals para manejar estados reactivos
  isLoading = signal(false); // Indicador de carga

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Inicia sesión con las credenciales proporcionadas.
   */
  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage.set(
        'Por favor, completa todos los campos correctamente.'
      );
      return;
    }

    this.isLoading.set(true);
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        if (response.token) {
          // Almacenar el token en localStorage
          localStorage.setItem('authToken', response.token);

          // Redirigir al usuario a la página principal
          this.router.navigate(['/productos']);
        } else {
          this.errorMessage.set('Error al iniciar sesión.');
        }
      },
      error: () => {
        this.errorMessage.set('Error al iniciar sesión. Inténtalo más tarde.');
      },
      complete: () => {
        this.isLoading.set(false); // Desactivar estado de carga
      },
    });
  }

  /**
   * Verifica si un campo específico del formulario es inválido y ha sido tocado.
   * @param fieldName - Nombre del campo a verificar.
   * @returns `true` si el campo es inválido y ha sido tocado, `false` en caso contrario.
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return (field?.invalid && field?.touched) ?? false;
  }
}
