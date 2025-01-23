import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetalleProductoComponent } from './detalle-producto.component';

@NgModule({
  imports: [CommonModule], // Solo CommonModule es necesario si no se usan otras directivas como ngIf o ngFor
  declarations: [DetalleProductoComponent],
})
export class DetalleProductoModule {}
