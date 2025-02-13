import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard'; // Importa el guardia de autenticación
import { ProductoComponent } from './components/productos/productos.component'; // Componente de productos
import { LoginComponent } from './components/login/login.component'; // Componente de inicio de sesión
import { RegisterComponent } from './components/register/register.component'; // Componente de registro
import { HomeComponent } from './components/home/home.component'; // Componente de página principal
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component'; // Componente para crear productos
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component'; // Componente para editar productos
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component'; // Componente para detalles de productos

export const routes: Routes = [
  // Ruta raíz: Redirige al inicio de sesión por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Rutas públicas accesibles para todos los usuarios
  { path: 'login', component: LoginComponent }, // Página de inicio de sesión
  { path: 'registro', component: RegisterComponent }, // Página de registro

  // Rutas protegidas (requieren autenticación)
  {
    path: 'productos',
    component: ProductoComponent,
    canActivate: [authGuard], // Protege esta ruta con el guardia de autenticación
  },
  {
    path: 'productos/:id',
    component: DetalleProductoComponent,
    canActivate: [authGuard], // Protege esta ruta
  },
  {
    path: 'crear-producto',
    component: CrearProductoComponent,
    canActivate: [authGuard], // Protege esta ruta
  },
  {
    path: 'actualizar-producto/:id',
    component: EditarProductoComponent,
    canActivate: [authGuard], // Protege esta ruta
  },

  // Ruta de la página principal (protegida)
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard], // Protege esta ruta
  },

  // Ruta comodín para manejar rutas no válidas
  { path: '**', redirectTo: '/login' }, // Redirige a la página de inicio de sesión si la ruta no existe
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configura las rutas principales
  exports: [RouterModule], // Exporta el módulo para que pueda ser utilizado en otros lugares
})
export class AppRoutingModule {}
