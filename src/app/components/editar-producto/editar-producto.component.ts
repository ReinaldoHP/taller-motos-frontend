import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { CommonModule } from '@angular/common';

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
  productoId: string = '';

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
    });
  }

  loadProducto(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.isLoading = true;

    this.productoService.getProductoById(id).subscribe({
      next: (producto: Producto) => {
        this.productoForm.patchValue(producto);
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
      return;
    }

    const id = this.route.snapshot.paramMap.get('id')!;
    const producto: Producto = this.productoForm.value;

    this.productoService.updateProducto(id, producto).subscribe({
      next: () => {
        this.successMessage = 'Producto actualizado correctamente.';
        setTimeout(() => this.router.navigate(['/productos']), 3000);
      },
      error: () => {
        this.errorMessage = 'Error al actualizar el producto.';
      },
    });
  }
}
