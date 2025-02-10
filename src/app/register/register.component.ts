import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule si no lo has hecho en otro lugar

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup; // Define la forma del formulario
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializa el formulario con validaciones
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]], // Validaciones para el nombre
      email: ['', [Validators.required, Validators.email]], // Validaciones para el correo electrónico
      password: ['', [Validators.required, Validators.minLength(6)]], // Validaciones para la contraseña
    });
  }

  // Método para enviar el formulario
  register(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    const userData = this.registerForm.value;

    this.authService.register(userData).subscribe(
      (response) => {
        this.router.navigate(['/login']); // Redirige al login si el registro es exitoso
      },
      (error) => {
        this.errorMessage =
          'Hubo un problema con el registro, intente nuevamente.'; // Mensaje de error
      }
    );
  }
}
