import { Routes } from '@angular/router';
import { ProductoComponent } from './components/productos/productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  { path: 'productos', component: ProductoComponent, canActivate: [AuthGuard] },
  {
    path: 'productos/:id',
    component: DetalleProductoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'crear-producto',
    component: CrearProductoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'actualizar-producto/:id',
    component: EditarProductoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];
