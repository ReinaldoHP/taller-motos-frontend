import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoleService } from '../../services/role.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit {
  roles: any[] = [];
  roleForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private roleService: RoleService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();
  }

  initForm(): void {
    this.roleForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      slug: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: [''],
    });
  }

  loadRoles(): void {
    this.isLoading = true;
    this.roleService.getAllRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
        this.errorMessage = 'Error al cargar los roles.';
        this.isLoading = false;
      },
    });
  }

  createRole(): void {
    if (this.roleForm.invalid) return;

    this.roleService.createRole(this.roleForm.value).subscribe({
      next: (res) => {
        this.successMessage = res.message; // usa el mensaje del backend
        this.roleForm.reset();
        this.loadRoles();
        this.clearMessagesAfterTimeout();
      },
      error: (err) => {
        console.error('Error al crear rol:', err);
        // Si vienen errores de validación:
        this.errorMessage =
          err.error?.message ||
          err.error?.errors?.slug?.[0] ||
          'No se pudo crear el rol.';
        this.clearMessagesAfterTimeout();
      },
    });
  }

  deleteRole(id: number): void {
    if (!confirm('¿Seguro que deseas eliminar este rol?')) return;

    this.roleService.deleteRole(id).subscribe({
      next: () => {
        this.successMessage = 'Rol eliminado correctamente.';
        this.loadRoles();
        this.clearMessagesAfterTimeout();
      },
      error: () => {
        this.errorMessage = 'Error al eliminar el rol.';
        this.clearMessagesAfterTimeout();
      },
    });
  }

  clearMessagesAfterTimeout(): void {
    setTimeout(() => {
      this.errorMessage = '';
      this.successMessage = '';
    }, 3000);
  }
}
