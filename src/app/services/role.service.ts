import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Role {
  id: number;
  nombre: string;
  slug: string;
  descripcion?: string;
}

@Injectable({ providedIn: 'root' })
export class RoleService {
  private apiUrl = `${environment.apiBaseUrl}/roles`;

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.apiUrl, {
      headers: this.authHeaders(),
    });
  }

  createRole(data: {
    nombre: string;
    slug: string;
    descripcion?: string;
  }): Observable<{ message: string; role: Role }> {
    return this.http.post<{ message: string; role: Role }>(this.apiUrl, data, {
      headers: this.authHeaders(),
    });
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.authHeaders(),
    });
  }
}
