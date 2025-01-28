import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
})
export class DetalleProductoComponent implements OnInit {
  producto: any = null; // Detalle del producto
  isLoading: boolean = true; // Estado de carga
  errorMessage: string | null = null; // Mensaje de error

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el parámetro 'id' de la ruta
    if (id) {
      this.loadProducto(id);
    } else {
      this.isLoading = false;
      this.errorMessage = 'No se encontró el ID del producto en la URL.';
    }
  }

  loadProducto(id: string): void {
    this.isLoading = true; // Inicia el estado de carga
    this.errorMessage = null; // Reinicia el mensaje de error

    this.productoService.getProductoById(id).subscribe(
      (data) => {
        this.producto = data;
        this.isLoading = false; // Finaliza el estado de carga
      },
      (error) => {
        console.error('Error al cargar el detalle del producto:', error);
        this.errorMessage = 'Error al cargar el detalle del producto.';
        this.isLoading = false; // Finaliza el estado de carga incluso en error
      }
    );
  }
}
