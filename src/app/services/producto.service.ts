import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; // Importamos ApiService
import { Producto } from '../models/producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private endpoint = 'productos'; // Endpoint para productos

  constructor(private apiService: ApiService) {}

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.apiService.get<Producto[]>(this.endpoint); // Delegamos la solicitud a ApiService
  }

  // Obtener un producto por ID
  getProducto(id: string): Observable<Producto> {
    return this.apiService.get<Producto>(`${this.endpoint}/${id}`); // Delegamos la solicitud a ApiService
  }

  // Crear un nuevo producto
  createProducto(producto: Producto): Observable<Producto> {
    return this.apiService.post<Producto>(this.endpoint, producto); // Delegamos la solicitud a ApiService
  }

  // Actualizar un producto existente
  updateProducto(id: string, producto: Producto): Observable<Producto> {
    return this.apiService.put<Producto>(`${this.endpoint}/${id}`, producto); // Delegamos la solicitud a ApiService
  }

  // Eliminar un producto
  deleteProducto(id: string): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`); // Delegamos la solicitud a ApiService
  }
}
