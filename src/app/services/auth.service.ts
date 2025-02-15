import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { RegisterResponse, LoginResponse, User } from '../models/auth.models';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Guarda el token JWT en el almacenamiento local.
   */
  saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('authToken', token);
    }
  }

  /**
   * Obtiene el token JWT del almacenamiento local.
   */
  getToken(): string | null {
    return isPlatformBrowser(this.platformId)
      ? localStorage.getItem('authToken')
      : null;
  }

  /**
   * Elimina el token JWT del almacenamiento local.
   */
  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
    }
  }

  /**
   * Registra un nuevo usuario.
   */
  register(credentials: {
    name: string;
    email: string;
    password: string;
  }): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.apiUrl}/register`,
      credentials
    );
  }

  /**
   * Inicia sesión.
   */
  login(credentials: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.token) {
            this.saveToken(response.token); // Guarda el token en localStorage
            console.log('Token guardado:', response.token);
          }
        })
      );
  }

  /**
   * Cierra sesión.
   */
  logout(): Observable<any> {
    const token = this.getToken(); // Usa el método centralizado para obtener el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${this.apiUrl}/logout`, null, { headers }).pipe(
      tap(() => {
        this.removeToken(); // Elimina el token del almacenamiento local
        console.log('Sesión cerrada correctamente.');
      })
    );
  }

  /**
   * Verifica si el usuario está autenticado.
   */
  isAuthenticated(): boolean {
    return !!this.getToken(); // Retorna `true` si el token existe, `false` en caso contrario
  }

  /**
   * Obtiene el usuario autenticado actualmente.
   */
  getAuthenticatedUser(): Observable<User> {
    const token = this.getToken(); // Usa el método centralizado para obtener el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<User>(`${this.apiUrl}/user`, { headers });
  }
}
