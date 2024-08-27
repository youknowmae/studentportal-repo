import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // apiUrl = 'http://26.68.32.39:8000/api';
  // apiUrl = 'http://localhost:8000/api';
  
  apiUrl = 'http://192.168.243.174:8000/api';
  checkReservationStatus: any;


  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  private getHeaders(): HttpHeaders {
    const authToken = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });
  }

  getAnnouncements(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/announcements`, { headers: this.getHeaders() });
  }

  //new API 
  getAnnouncementById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/announcements/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching announcement:', error);
          return throwError('An error occurred while fetching the announcement.');
        })
      );
  }


  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/articles`, { headers: this.getHeaders() });
  }

  getArticlesByMaterialType(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/articles/type/${type}`, { headers: this.getHeaders() });
  }

  getArticleById(accession: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/article/id/${accession}`, { headers: this.getHeaders() });
  }
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/books`, { headers: this.getHeaders() });
  }

  getBookById(accession: string, headers?: { [key: string]: string }): Observable<any> {
    let options = {};
    if (headers) {
      options = { headers };
    }
    return this.http.get<any>(`${this.apiUrl}/student/book/id/${accession}`, options);
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/projects`, { headers: this.getHeaders() });
  }

  getProjectsByDepartment(department: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/projects/department/${department}`, { headers: this.getHeaders() });
  }

  getProjectsByCategoryAndDepartment(category: string, department: string): Observable<any[]> {
    const url = `${this.apiUrl}/student/project/${category}/${department}`;
    return this.http.get<any[]>(url, { headers: this.getHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching projects:', error);
        return throwError('An error occurred while fetching projects.');
      })
    );
  }

  getPeriodicals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/periodicals`, { headers: this.getHeaders() });
  }

  getPeriodicalById(accession: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/periodicals/id/${accession}`, { headers: this.getHeaders() });
  }

  getPeriodicalsByMaterialType(materialType: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/periodicals/materialtype/${materialType}`, { headers: this.getHeaders() });
  }

  getReservationsByUserId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/reservations/${id}`, { headers: this.getHeaders() });
  }

  getReservationsByLoggedInUser(): Observable<any[]> {
    const userId = parseInt(this.authService.getLoggedInUserId() || '0');
    return this.getReservationsByUserId(userId);
  }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/student/newreservations`, reservationData, { headers: this.getHeaders() });
  }

getBorrowedById(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/borrowed/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return throwError('No borrow record found with the given ID');
          } else {
            return throwError('An error occurred while fetching the borrow record');
          }
        })
      );
  }
  getBorrowedByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/borrowed/user/${userId}`, { headers: this.getHeaders() })
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

  getBorrowedsyUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/borrow/user/${userId}`, { headers: this.getHeaders() })
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
  
  getUserById(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservations/${userId}`, { headers: this.getHeaders() });
  }

  getBorrowedByLoggedInUser(): Observable<any[]> {
    const userId = parseInt(this.authService.getLoggedInUserId() || '0');
    return this.getBorrowedByUserId(userId);
  }

  getProjectById(accession: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/project/id/${accession}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching project:', error);
          return throwError(error);
        })
      );
  }

  getDepartment(): string | null {
    return localStorage.getItem('department');
  }

  searchBooks(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/books/search?query=${query}`, { headers: this.getHeaders() });
  }

  searchArticles(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/articles/search?query=${query}`, { headers: this.getHeaders() });
  }

  searchPeriodicals(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/periodicals/search?query=${query}`, { headers: this.getHeaders() });
  }

  searchProjects(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/search/project?query=${query}`, { headers: this.getHeaders() });
  }

  getQueuePosition(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/students/queue-pos/`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.error.message);
    return throwError('Something bad happened; please try again later.');
  }

  getReservationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/reservations/user/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching reservation:', error);
          return throwError(error);
        })
      );
  }
  
  cancelReservation(id: string): Observable<any> {
    const userId = this.authService.getLoggedInUserId(); // Get user ID from authentication service
    return this.http.patch<any>(`${this.apiUrl}/student/reservations/cancel/${id}`, { user_id: userId }, { headers: this.getHeaders() });
  }

  //audio shits
  getAudioVisuals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/audio-visual`, { headers: this.getHeaders() });
  }

  getAudioVisualByAccession(accession: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/student/audio-visuals/${accession}`, { headers: this.getHeaders() });
  }

  searchAudioVisuals(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/student/audiovisuals/searchs`, {
      headers: this.getHeaders(),
      params: { query }
    });
  }

  getPatronById(patronId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/patrons/${patronId}`);
  }
}
