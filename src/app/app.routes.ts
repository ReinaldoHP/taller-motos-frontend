import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductoComponent } from './components/productos/productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
  // Redirige al home por defecto
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  // Ruta para la página de inicio
  {
    path: 'home',
    component: HomeComponent,
  },

  // Ruta para iniciar sesión
  {
    path: 'login',
    component: LoginComponent,
  },

  // Ruta para registrarse
  {
    path: 'registro',
    component: RegisterComponent,
  },

  // Rutas protegidas que requieren autenticación
  {
    path: 'productos',
    component: ProductoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'productos/:id',
    component: DetalleProductoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'crear-producto',
    component: CrearProductoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'actualizar-producto/:id',
    component: EditarProductoComponent,
    canActivate: [authGuard],
  },

  // Rutas para usuarios
  {
    path: 'usuarios', // Lista de usuarios
    component: UserListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usuario/crear', // Crear un nuevo usuario
    component: UserComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usuario/editar/:id', // Editar un usuario existente
    component: UserComponent,
    canActivate: [authGuard],
  },

  // Ruta comodín para redirigir a /home si la ruta no existe
  { path: '**', redirectTo: '/home' },
];
