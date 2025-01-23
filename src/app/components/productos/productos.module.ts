import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas comunes como ngIf, ngFor, etc.
import { RouterModule } from '@angular/router'; // Para manejar las rutas
import { ProductoService } from '../../services/producto.service'; // Servicio para los productos
import { FormsModule } from '@angular/forms'; // Para usar ngModel y otros elementos de formularios

@NgModule({
  declarations: [], // Declaración de los componentes
  imports: [CommonModule, RouterModule, FormsModule, ], // Importación de módulos necesarios
  providers: [ProductoService], // Proveedor del servicio de producto
  exports: [ ], // Exportación de los componentes para su uso en otros módulos
})
export class ProductosModule {}
