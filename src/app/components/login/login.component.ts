import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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
   * Método para manejar el envío del formulario de inicio de sesión.
   */
  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage.set(
        'Por favor, complete todos los campos correctamente.'
      );
      return;
    }

    this.isLoading.set(true);
    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (response: LoginResponse) => {
        this.isLoading.set(false);
        console.log('Inicio de sesión exitoso:', response);

        // Redirige al usuario a la página de productos
        this.router.navigate(['/productos']).then(() => {
          console.log('Redirigiendo a /productos');
        });
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error en el inicio de sesión:', error);
        this.errorMessage.set(
          error.message || 'Credenciales incorrectas. Inténtalo de nuevo.'
        );
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
