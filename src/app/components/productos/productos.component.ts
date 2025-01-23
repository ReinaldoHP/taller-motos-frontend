import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service'; // ProductoService sigue siendo usado aquí
import { Producto } from '../../models/producto.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private productoService: ProductoService) {}

  // Cargar productos al iniciar el componente
  ngOnInit(): void {
    this.loadProductos();
  }

  // Función para cargar los productos desde el servicio
  loadProductos(): void {
    this.isLoading = true; // Indicamos que está cargando
    this.productoService.getProductos().subscribe(
      (data) => {
        this.productos = data; // Asignamos los datos obtenidos a la variable productos
        this.isLoading = false; // Indicamos que ya no está cargando
      },
      (error) => {
        this.errorMessage = 'Error al cargar los productos'; // Mensaje de error si la solicitud falla
        this.isLoading = false; // Indicamos que ya no está cargando
      }
    );
  }

  // Eliminar un producto
  deleteProducto(id: string): void {
    this.productoService.deleteProducto(id).subscribe(
      () => {
        // Filtrar el producto eliminado de la lista
        this.productos = this.productos.filter(
          (producto) => producto.id !== id
        );
      },
      (error) => {
        console.error('Error al eliminar producto:', error);
      }
    );
  }
}
