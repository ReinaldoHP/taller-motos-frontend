import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.apiUrl}/${endpoint}`, body, {
        headers: this.getHeaders(),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.apiUrl}/${endpoint}`, body, {
        headers: this.getHeaders(),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  delete(endpoint: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${endpoint}`, {
        headers: this.getHeaders(),
      })
      .pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      errorMessage = `Código de error del servidor: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
