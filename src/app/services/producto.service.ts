import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Producto } from '../models/producto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private endpoint = 'productos';

  constructor(private apiService: ApiService) {}

  // Obtener todos los productos
  getProductos(): Observable<Producto[]> {
    return this.apiService.get<Producto[]>(this.endpoint);
  }

  // Obtener un producto por su ID
  getProductoById(id: string): Observable<Producto> {
    return this.apiService.get<Producto>(`${this.endpoint}/${id}`);
  }

  // Crear un nuevo producto
  createProducto(producto: Producto): Observable<Producto> {
    return this.apiService.post<Producto>(this.endpoint, producto);
  }

  // Actualizar un producto existente
  updateProducto(id: string, producto: Producto): Observable<Producto> {
    return this.apiService.put<Producto>(`${this.endpoint}/${id}`, producto);
  }

  // Eliminar un producto
  deleteProducto(id: string): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`);
  }
}
