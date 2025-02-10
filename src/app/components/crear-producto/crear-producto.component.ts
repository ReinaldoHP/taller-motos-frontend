import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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

  // Inicializa el formulario con validaciones
  initializeForm(): void {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      codigo_barra: ['', [Validators.required]],
    });

    // Generar un código de barra único de 10 dígitos
    this.generateCodigoBarra();
  }

  // Generar un código de barra único de 10 dígitos
  generateCodigoBarra(): void {
    const codigoBarra = this.generateRandomCodigoBarra();
    this.productoForm.patchValue({
      codigo_barra: codigoBarra,
    });
  }

  // Función para generar un código de barra aleatorio de 10 dígitos
  generateRandomCodigoBarra(): string {
    const min = 1000000000; // 10 dígitos mínimo
    const max = 9999999999; // 10 dígitos máximo
    const codigoBarra = Math.floor(Math.random() * (max - min + 1)) + min;
    return codigoBarra.toString();
  }

  // Función que se ejecuta cuando se envía el formulario
  onSubmit(): void {
    if (this.productoForm.invalid) {
      return;
    }

    const producto = this.productoForm.value;

    this.isLoading = true; // Activar estado de carga

    this.productoService.createProducto(producto).subscribe({
      next: () => {
        this.successMessage = 'Producto creado con éxito';
        setTimeout(() => this.router.navigate(['/productos']), 3000); // Redirigir después de 3 segundos
      },
      error: (error) => {
        this.errorMessage = `Hubo un error al crear el producto: ${error.message}`;
      },
      complete: () => {
        this.isLoading = false; // Desactivar estado de carga
      },
    });
  }
}
