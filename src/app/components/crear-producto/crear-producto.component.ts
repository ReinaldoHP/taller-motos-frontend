import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-producto',
  standalone: true, // Definirlo como standalone
  imports: [FormsModule], // Importar FormsModule para usar ngModel
  templateUrl: './crear-producto.component.html',
})
export class CrearProductoComponent {
  producto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    codigo_barra: '',
  };
isLoading: boolean | null | undefined;
successMessage: any;
errorMessage: any;

  crearProducto() {
    console.log('Producto creado:', this.producto);
  }
}
