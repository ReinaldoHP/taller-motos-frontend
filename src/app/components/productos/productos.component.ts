import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, RouterModule], // Importamos RouterModule
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private productoService: ProductoService,
    private router: Router // No es necesario usar @Inject aquí
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  /**
   * Cargar la lista de productos desde el servicio.
   */
  loadProductos(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.productoService.getProductos().subscribe({
      next: (data: Producto[]) => {
        this.productos = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage =
          'Error al cargar los productos. Inténtalo más tarde.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Eliminar un producto con confirmación.
   */
  deleteProducto(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe({
        next: () => {
          this.productos = this.productos.filter(
            (producto) => producto.id !== id
          );
          this.successMessage = 'Producto eliminado correctamente.';
          this.clearMessagesAfterTimeout();
        },
        error: () => {
          this.errorMessage = 'Error al eliminar el producto.';
          this.clearMessagesAfterTimeout();
        },
      });
    }
  }

  /**
   * Redirigir al formulario de actualización con el ID del producto.
   */
  updateProducto(id: string): void {
    this.router.navigate(['/actualizar-producto', id]);
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
