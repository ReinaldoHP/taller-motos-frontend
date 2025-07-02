import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Importa dependencias necesarias
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userForm!: FormGroup;
  isEditing = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Inicializa el formulario reactivo.
   */
  initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [''],
    });
  }

  /**
   * Guarda o actualiza un usuario.
   */
  saveUser(): void {
    if (this.userForm.invalid) return;

    const userData = this.userForm.value;

    if (this.isEditing) {
      // Lógica para actualizar usuario (si es necesario)
    } else {
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.successMessage = 'Usuario creado correctamente';
          setTimeout(() => this.router.navigate(['/usuarios']), 2000); // Redirige a la lista de usuarios
        },
        error: () => {
          this.errorMessage = 'Error al crear el usuario.';
        },
      });
    }
  }

  /**
   * Resetea el formulario.
   */
  resetForm(): void {
    this.userForm.reset();
  }
}
