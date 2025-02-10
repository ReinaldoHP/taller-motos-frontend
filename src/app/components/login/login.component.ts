import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup; // Define la forma del formulario
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializa el formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validaciones para el correo electrónico
      password: ['', [Validators.required, Validators.minLength(6)]], // Validaciones para la contraseña
    });
  }

  // Método para iniciar sesión
  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
      return;
    }

    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe(
      (response) => {
        // Al iniciar sesión exitosamente, redirigir a la página de inicio o dashboard
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Si ocurre un error, mostrar el mensaje correspondiente
        this.errorMessage = 'Credenciales incorrectas, intente nuevamente.';
      }
    );
  }
}
