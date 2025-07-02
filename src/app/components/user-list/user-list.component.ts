import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/auth.models';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  selectedRoles: number[] = [];
  availableRoles: { id: number; nombre: string }[] = [];

  isLoading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar los usuarios.';
        this.isLoading = false;
      },
    });
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (roles) => (this.availableRoles = roles),
      error: () => {
        this.errorMessage = 'Error al cargar los roles.';
      },
    });
  }

  deleteUser(id: number | undefined): void {
    if (!id) return;
    if (confirm('¿Eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== id);
          this.successMessage = 'Usuario eliminado correctamente.';
          this.clearMessagesAfterTimeout();
        },
        error: () => {
          this.errorMessage = 'Error al eliminar el usuario.';
          this.clearMessagesAfterTimeout();
        },
      });
    }
  }

  updateUser(id: number): void {
    if (!id) return;
    this.router.navigate(['/usuario/editar', id]);
  }

  /** Abrir modal de asignar roles */
  openRoleModal(user: User): void {
    this.selectedUser = user;
    this.selectedRoles = user.roles?.map((r) => r.id) || [];
  }

  /** Cerrar modal */
  closeRoleModal(): void {
    this.selectedUser = null;
    this.selectedRoles = [];
  }

  /** Alternar selección de un rol */
  toggleRole(roleId: number): void {
    const index = this.selectedRoles.indexOf(roleId);
    index > -1
      ? this.selectedRoles.splice(index, 1)
      : this.selectedRoles.push(roleId);
  }

  /** Enviar asignación de roles */
  assignRoles(): void {
    if (!this.selectedUser?.id) return;

    this.userService
      .assignRoles(this.selectedUser.id, this.selectedRoles)
      .subscribe({
        next: () => {
          this.successMessage = 'Roles asignados correctamente.';
          this.closeRoleModal();
          this.loadUsers();
          this.clearMessagesAfterTimeout();
        },
        error: () => {
          this.errorMessage = 'No se pudieron asignar los roles.';
          this.clearMessagesAfterTimeout();
        },
      });
  }

  private clearMessagesAfterTimeout(): void {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 3000);
  }
}
