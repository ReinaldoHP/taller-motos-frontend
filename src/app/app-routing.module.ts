import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './components/productos/productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';

export const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', component: ProductoComponent },
  { path: 'productos/crear', component: CrearProductoComponent },
  { path: 'productos/editar/:id', component: EditarProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Definir rutas en el RouterModule
  exports: [RouterModule], // Exportar para que estén disponibles en toda la aplicación
})
export class AppRoutingModule {}
