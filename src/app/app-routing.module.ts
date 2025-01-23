import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './components/productos/productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';

export const routes: Routes = [
  { path: 'productos', component: ProductoComponent },
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos/crear', component: CrearProductoComponent },
  { path: 'productos/:id', component: DetalleProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Definir rutas en el RouterModule
  exports: [RouterModule], // Exportar para que estén disponibles en toda la aplicación
})
export class AppRoutingModule {}
