import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/auth.models';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule], // Importa dependencias necesarias
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = []; // Lista de usuarios
  isLoading: boolean = true; // Indica si los datos están cargando
  errorMessage: string = ''; // Mensaje de error
  successMessage: string = ''; // Mensaje de éxito

  constructor(
    private userService: UserService, // Servicio para interactuar con el backend
    private router: Router // Para navegar entre rutas
  ) {}

  ngOnInit(): void {
    this.loadUsers(); // Carga la lista de usuarios al iniciar el componente
  }

  /**
   * Cargar la lista de usuarios desde el servicio.
   */
  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data; // Asigna los usuarios obtenidos
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los usuarios:', error);
        this.errorMessage =
          'Error al cargar los usuarios. Inténtalo más tarde.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Eliminar un usuario con confirmación.
   */
  deleteUser(id: number | undefined): void {
    if (!id) {
      console.error('ID del usuario no definido.');
      this.errorMessage = 'Error: ID del usuario no definido.';
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== id); // Filtra el usuario eliminado
          this.successMessage = 'Usuario eliminado correctamente.';
          this.clearMessagesAfterTimeout();
        },
        error: (error) => {
          console.error('Error al eliminar el usuario:', error);
          this.errorMessage = 'Error al eliminar el usuario.';
          this.clearMessagesAfterTimeout();
        },
      });
    }
  }

  /**
   * Redirigir al formulario de actualización con el ID del usuario.
   */
  updateUser(id: number): void {
    if (!id) {
      console.error('ID del usuario no definido.');
      this.errorMessage = 'Error: ID del usuario no definido.';
      return;
    }

    this.router.navigate(['/usuario/editar', id]); // Navega a la ruta de edición
  }

  /**
   * Limpiar mensajes después de un tiempo.
   */
  private clearMessagesAfterTimeout(): void {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 3000); // 3 segundos
  }
}
