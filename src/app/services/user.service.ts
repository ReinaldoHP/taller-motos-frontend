import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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
    return this.http
      .get<{ users: User[] }>(`${environment.apiBaseUrl}/${this.endpoint}`)
      .pipe(map((response) => response.users));
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

  assignRoles(userId: number, roles: number[]): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(
      `${environment.apiBaseUrl}/users/${userId}/roles`,
      { roles },
      { headers }
    );
  }
}
