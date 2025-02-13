import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/auth.models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  isEditing = false;
  selectedUserId: number | null = null;
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(private userService: UserService, private fb: FormBuilder) {
    // Inicializa el formulario reactivo
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.loadUsers(); // Carga la lista de usuarios al iniciar el componente
  }

  /**
   * Cargar la lista de usuarios desde el backend
   */
  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        this.errorMessage = 'Error al cargar usuarios. Inténtalo de nuevo.';
        this.isLoading = false;
        this.clearMessages();
      },
    });
  }

  /**
   * Guardar o actualizar un usuario
   */
  saveUser(): void {
    if (this.userForm.invalid) return;

    const userData = this.userForm.value;

    if (this.isEditing && this.selectedUserId) {
      // Modo edición: Actualizar usuario existente
      this.userService.updateUser(this.selectedUserId, userData).subscribe({
        next: () => {
          this.successMessage = 'Usuario actualizado correctamente';
          this.resetForm();
          this.loadUsers();
          this.clearMessages();
        },
        error: (error) => {
          console.error('Error al actualizar el usuario:', error);
          this.errorMessage =
            error.status === 422
              ? 'Los datos ingresados son inválidos.'
              : 'Error al actualizar el usuario. Inténtalo de nuevo.';
          this.clearMessages();
        },
      });
    } else {
      // Modo creación: Crear nuevo usuario
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.successMessage = 'Usuario creado correctamente';
          this.resetForm();
          this.loadUsers();
          this.clearMessages();
        },
        error: (error) => {
          console.error('Error al crear el usuario:', error);
          this.errorMessage =
            error.status === 422
              ? 'Los datos ingresados son inválidos.'
              : 'Error al crear el usuario. Inténtalo de nuevo.';
          this.clearMessages();
        },
      });
    }
  }

  /**
   * Editar un usuario existente
   */
  editUser(user: User): void {
    this.isEditing = true;
    this.selectedUserId = user.id!;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      password: '', // No se rellena la contraseña por seguridad
    });
  }

  /**
   * Eliminar un usuario
   */
  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.successMessage = 'Usuario eliminado correctamente';
          this.loadUsers();
          this.clearMessages();
        },
        error: (error) => {
          console.error('Error al eliminar el usuario:', error);
          this.errorMessage =
            'Error al eliminar el usuario. Inténtalo de nuevo.';
          this.clearMessages();
        },
      });
    }
  }

  /**
   * Resetear el formulario
   */
  resetForm(): void {
    this.userForm.reset();
    this.isEditing = false;
    this.selectedUserId = null;
  }

  /**
   * Limpiar mensajes después de 3 segundos
   */
  private clearMessages(): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 3000);
  }
}
