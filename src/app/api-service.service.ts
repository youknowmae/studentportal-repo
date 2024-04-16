import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  private getHeaders(): HttpHeaders {
    const authToken = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
  }

  getArticles() {
    return this.http.get<any[]>(`${this.apiUrl}/articles`, { headers: this.getHeaders() });
  }

  getBooks() {
    return this.http.get<any[]>(`${this.apiUrl}/books`, { headers: this.getHeaders() });
  }

  getPeriodicals() {
    return this.http.get<any[]>(`${this.apiUrl}/periodicals`, { headers: this.getHeaders() });
  }

  getProjects() {
    return this.http.get<any[]>(`${this.apiUrl}/projects`, { headers: this.getHeaders() });
  }
}