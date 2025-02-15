import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private endpoint = 'productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${environment.apiBaseUrl}/${this.endpoint}`
    );
  }

  getProductoById(id: string): Observable<Producto> {
    return this.http.get<Producto>(
      `${environment.apiBaseUrl}/${this.endpoint}/${id}`
    );
  }

  createProducto(producto: Producto): Observable<any> {
    return this.http.post(
      `${environment.apiBaseUrl}/${this.endpoint}`,
      producto
    );
  }

  updateProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(
      `${environment.apiBaseUrl}/${this.endpoint}/${id}`,
      producto
    );
  }

  deleteProducto(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiBaseUrl}/${this.endpoint}/${id}`
    );
  }
}
