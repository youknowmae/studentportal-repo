import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // apiUrl = 'http://localhost:8000/api';
  apiUrl = 'http://192.168.18.185:8000/api';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  private getHeaders(): HttpHeaders {
    const authToken = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}` 
    });
  }

  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/articles`, { headers: this.getHeaders() });
  }

  getArticlesByMaterialType(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/articles/type/${type}`, { headers: this.getHeaders() });
  }

  getArticleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/article/id/${id}`, { headers: this.getHeaders() });
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/books`, { headers: this.getHeaders() });
  }

  getBookById(id: number, headers?: { [key: string]: string }): Observable<any> {
    let options = {};
    if (headers) {
      options = { headers };
    }
    return this.http.get<any>(`${this.apiUrl}/student/book/id/${id}`, options);
  }


  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/projects`, { headers: this.getHeaders() });
  }

  getProjectsByDepartment(department: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/projects/department/${department}`, { headers: this.getHeaders() });
  }

    // Periodicals
    getPeriodicals(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}/student/periodicals`, { headers: this.getHeaders() });
    }
    
    getPeriodicalById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/periodical/${id}`, { headers: this.getHeaders() });
  }
  
    getPeriodicalsByMaterialType(type: string): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}student/periodicals/type/${type}`, { headers: this.getHeaders() });
    }

   getReservationsByUserId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservations/${id}`, { headers: this.getHeaders() });
  }

  getReservationsByLoggedInUser(): Observable<any[]> {
    const userId = parseInt(this.authService.getLoggedInUserId() || '0'); // Get the logged-in user ID
    return this.getReservationsByUserId(userId); // Call the existing method with the logged-in user ID
  }
  createReservation(reservationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservations`, reservationData, { headers: this.getHeaders() });
  }
  getBorrowedByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/borrow/user/${userId}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return throwError('No borrow records found for the user');
          } else {
            return throwError('An error occurred while fetching borrow records');
          }
        })
      );
  }

  getBorrowedByLoggedInUser(): Observable<any[]> {
    const userId = parseInt(this.authService.getLoggedInUserId() || '0');
    return this.getBorrowedByUserId(userId);
  }
   
  getDepartment(): string | null {
    return localStorage.getItem('department');
  }
  
  
}
