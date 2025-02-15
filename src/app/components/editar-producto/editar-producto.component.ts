import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
})
export class EditarProductoComponent implements OnInit {
  productoForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  productoId: string | undefined;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProducto();
  }

  initializeForm(): void {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      codigo_barra: [''], // Código de barras es opcional
    });
  }

  loadProducto(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('ID del producto no encontrado.');
      this.errorMessage = 'Error: ID del producto no encontrado.';
      return;
    }

    this.productoId = id;
    this.isLoading = true;

    this.productoService.getProductoById(id).subscribe({
      next: (response: any) => {
        if (!response.success || !response.producto) {
          console.error('Datos del producto incompletos:', response);
          this.errorMessage = 'Error: Datos del producto incompletos.';
          this.isLoading = false;
          return;
        }

        const producto = response.producto;

        this.productoForm.patchValue({
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          cantidad: producto.cantidad,
          codigo_barra: producto.codigo_barra || '', // Proporciona un valor predeterminado si está vacío
        });

        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Error al cargar el producto.';
        this.isLoading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      console.error('Formulario inválido:', this.productoForm.value);
      return;
    }

    const id = this.productoId;
    if (!id) {
      console.error('ID del producto no definido.');
      this.errorMessage = 'Error: ID del producto no definido.';
      return;
    }

    const producto: Producto = this.productoForm.value;
    console.log('Datos enviados al backend:', producto); // Log para depuración

    this.productoService.updateProducto(id, producto).subscribe({
      next: (response: any) => {
        console.log('Respuesta del backend:', response); // Log para depuración
        if (response.success) {
          this.successMessage = 'Producto actualizado correctamente.';
          setTimeout(() => this.router.navigate(['/productos']), 3000);
        } else {
          this.errorMessage =
            response.message || 'Error al actualizar el producto.';
        }
      },
      error: (err) => {
        console.error('Error en la solicitud:', err); // Log para depuración
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message; // Muestra el mensaje de error del backend
        } else if (err.status === 422) {
          this.errorMessage =
            'Error de validación. Verifica los datos ingresados.';
        } else {
          this.errorMessage =
            'Error al actualizar el producto. Inténtalo más tarde.';
        }
      },
    });
  }
}
