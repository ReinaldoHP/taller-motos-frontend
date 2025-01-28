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

  isLoading: boolean = false; // Inicializar como false para evitar undefined
  successMessage: string | null = null; // Inicializar como null
  errorMessage: string | null = null; // Inicializar como null

  // Función que se ejecuta cuando se envía el formulario
  crearProducto() {
    this.isLoading = true; // Se activa el estado de carga

    // Simulando un retraso de la API o lógica de negocio
    setTimeout(() => {
      this.isLoading = false; // Desactivar el estado de carga
      // Simular respuesta exitosa
      this.successMessage = 'Producto creado con éxito';
      // Simular error en caso de fallo
      // this.errorMessage = 'Hubo un error al crear el producto';

      // Mostrar el producto que se ha creado en la consola
      console.log('Producto creado:', this.producto);
    }, 2000);
  }
}
