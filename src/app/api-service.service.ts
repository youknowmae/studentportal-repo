import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/articles`, { headers: this.getHeaders() });
  }

  getArticlesByMaterialType(materialType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/articles/${materialType}`, { headers: this.getHeaders() });
  }

  getArticleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/article/id/${id}`, { headers: this.getHeaders() });
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books`, { headers: this.getHeaders() });
  }

  getBookById(bookId: number, headers?: { [key: string]: string }): Observable<any> {
    let options = {};
    if (headers) {
      options = { headers };
    }
    return this.http.get<any>(`${this.apiUrl}/book/id/${bookId}`, options);
  }


  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`, { headers: this.getHeaders() });
  }

  getProjectsByDepartment(department: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects/categories/${department}`, { headers: this.getHeaders() });
  }

    // Periodicals
    getPeriodicals(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/periodicals`, { headers: this.getHeaders() });
    }
  
    getPeriodicalsByMaterialType(materialType: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/periodicals/${materialType}`, { headers: this.getHeaders() });
    }

   getReservationsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservations/${userId}`, { headers: this.getHeaders() });
  }

  getReservationsByLoggedInUser(): Observable<any[]> {
    const userId = parseInt(this.authService.getLoggedInUserId() || '0'); // Get the logged-in user ID
    return this.getReservationsByUserId(userId); // Call the existing method with the logged-in user ID
  }

   
  getDepartment(): string | null {
    return localStorage.getItem('department');
  }
}
