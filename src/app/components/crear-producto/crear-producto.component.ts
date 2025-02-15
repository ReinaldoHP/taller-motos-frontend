import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent implements OnInit {
  productoForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Inicializa el formulario con validaciones.
   */
  private initializeForm(): void {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      codigo_barra: [''], // Código de barras es opcional
    });

    // Generar un código de barras único automáticamente
    this.generateCodigoBarra();
  }

  /**
   * Genera un código de barras único de 10 dígitos.
   */
  private generateCodigoBarra(): void {
    const codigoBarra = this.generateRandomCodigoBarra();
    this.productoForm.patchValue({ codigo_barra: codigoBarra });
  }

  /**
   * Genera un número aleatorio de 10 dígitos para el código de barras.
   */
  private generateRandomCodigoBarra(): string {
    const min = 1000000000; // Mínimo de 10 dígitos
    const max = 9999999999; // Máximo de 10 dígitos
    return Math.floor(Math.random() * (max - min + 1) + min).toString();
  }

  /**
   * Verifica si un campo es inválido y ha sido tocado o modificado.
   * @param field - Nombre del campo del formulario.
   * @returns Booleano que indica si el campo es inválido.
   */
  isInvalid(field: string): boolean {
    const control = this.productoForm.get(field);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  /**
   * Envía el formulario para crear un producto.
   */
  onSubmit(): void {
    if (this.productoForm.invalid) {
      console.error('Formulario inválido:', this.productoForm.value);
      return;
    }

    const producto = this.productoForm.value;

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.productoService.createProducto(producto).subscribe({
      next: () => {
        this.successMessage = 'Producto creado correctamente.';
        setTimeout(() => this.router.navigate(['/productos']), 3000); // Redirigir después de 3 segundos
      },
      error: (error) => {
        if (error.status === 401) {
          // Redirigir al usuario a la página de inicio de sesión si la sesión expira
          this.router.navigate(['/login']);
          this.errorMessage =
            'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
        } else {
          this.errorMessage = `Hubo un error al crear el producto: ${error.message}`;
        }
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false; // Desactivar estado de carga
      },
    });
  }
}
