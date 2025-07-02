import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterResponse } from '../../models/auth.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup; // Formulario reactivo
  errorMessage = ''; // Mensaje de error

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializa el formulario con validaciones
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['administrador'],
    });
  }

  /**
   * Método para enviar el formulario.
   * Verifica si el formulario es válido antes de enviar los datos.
   */
  register(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    const userData = this.registerForm.value;

    // Llama al servicio de autenticación para registrar un nuevo usuario
    this.authService.register(userData).subscribe({
      next: (response: RegisterResponse) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']).then(() => {
          console.log('Redirigiendo a /login');
        });
      },
      error: (error: any) => {
        console.error('Error en el registro:', error);

        // Muestra un mensaje de error específico si el backend lo proporciona
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message; // Mensaje del backend
        } else {
          this.errorMessage =
            'Hubo un problema con el registro, intente nuevamente.';
        }
      },
    });
  }

  /**
   * Método auxiliar para verificar si un campo del formulario es inválido.
   * @param fieldName - Nombre del campo a verificar.
   * @returns `true` si el campo es inválido y ha sido tocado, `false` en caso contrario.
   */
  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return (field?.invalid && field?.touched) ?? false;
  }
}
