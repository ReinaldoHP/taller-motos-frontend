import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root', // Proporciona el servicio en la raíz para que esté disponible globalmente
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl; // URL base de la API

  constructor(private http: HttpClient) {}

  /**
   * Realiza una solicitud GET a la API.
   * @param endpoint - El endpoint específico de la API.
   * @returns Un Observable con los datos de respuesta.
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud GET:', error);
        return this.handleError(error);
      })
    );
  }

  /**
   * Realiza una solicitud POST a la API.
   * @param endpoint - El endpoint específico de la API.
   * @param body - Los datos a enviar en la solicitud.
   * @returns Un Observable con los datos de respuesta.
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud POST:', error);
        return this.handleError(error);
      })
    );
  }

  /**
   * Realiza una solicitud PUT a la API.
   * @param endpoint - El endpoint específico de la API.
   * @param body - Los datos a enviar en la solicitud.
   * @returns Un Observable con los datos de respuesta.
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud PUT:', error);
        return this.handleError(error);
      })
    );
  }

  /**
   * Realiza una solicitud DELETE a la API.
   * @param endpoint - El endpoint específico de la API.
   * @returns Un Observable que indica si la eliminación fue exitosa.
   */
  delete(endpoint: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud DELETE:', error);
        return this.handleError(error);
      })
    );
  }

  /**
   * Maneja errores generales de las solicitudes HTTP.
   * @param error - El error capturado.
   * @returns Un Observable que emite un error.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error del servidor: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
