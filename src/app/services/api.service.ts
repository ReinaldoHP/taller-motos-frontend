import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl; // URL base de la API

  constructor(private http: HttpClient) {}

  // Método GET
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`).pipe(
      catchError((error) => {
        console.error('Error en la solicitud GET:', error);
        return throwError(() => new Error('Error en la solicitud GET'));
      })
    );
  }

  // Método POST
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body).pipe(
      catchError((error) => {
        console.error('Error en la solicitud POST:', error);
        return throwError(() => new Error('Error en la solicitud POST'));
      })
    );
  }

  // Método PUT
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body).pipe(
      catchError((error) => {
        console.error('Error en la solicitud PUT:', error);
        return throwError(() => new Error('Error en la solicitud PUT'));
      })
    );
  }

  // Método DELETE
  delete(endpoint: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}`).pipe(
      catchError((error) => {
        console.error('Error en la solicitud DELETE:', error);
        return throwError(() => new Error('Error en la solicitud DELETE'));
      })
    );
  }
}
