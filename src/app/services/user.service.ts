import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private endpoint = 'users'; // Endpoint para usuarios en el backend

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de todos los usuarios.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/${this.endpoint}`);
  }

  /**
   * Obtiene un usuario específico por su ID.
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(
      `${environment.apiBaseUrl}/${this.endpoint}/${id}`
    );
  }

  /**
   * Crea un nuevo usuario.
   */
  createUser(user: Partial<User>): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/${this.endpoint}`, user);
  }

  /**
   * Actualiza un usuario existente.
   */
  updateUser(id: number, user: Partial<User>): Observable<any> {
    return this.http.put(
      `${environment.apiBaseUrl}/${this.endpoint}/${id}`,
      user
    );
  }

  /**
   * Elimina un usuario por su ID.
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.apiBaseUrl}/${this.endpoint}/${id}`
    );
  }
}
