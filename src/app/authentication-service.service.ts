import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl = 'http://localhost:8000/api';
  // apiUrl = 'http://26.68.32.39:8000/api';

  authToken: string | null = null;
  loggedInUserId: string | null = null;
  department: string | null = null;
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); // Add this line
  public user$ = this.userSubject.asObservable(); // Add this line

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/student`, credentials)
      .pipe(
        tap(response => {
          console.log('API Response:', response);
  
          if (response && response.token) {
            this.authToken = response.token;
            this.loggedInUserId = response.id.toString();
            this.department = response.department; // Update department

            if (this.authToken) {
              localStorage.setItem('authToken', this.authToken);
            }
            if (this.loggedInUserId) {
              localStorage.setItem('loggedInUserId', this.loggedInUserId);
            }
            if (this.department) {
              localStorage.setItem('department', this.department); // Save department in localStorage
            }
          
            this.userSubject.next(response); // Update userSubject with user details
          }
        }),
        catchError(error => {
          // Handle errors here (e.g., display error messages)
          console.error('Login error:', error);
          return throwError(error); // Rethrow the error for the component to handle
        })
      );
  }

  logout() {
    this.authToken = null;
    this.loggedInUserId = null;
    this.department = null; // Clear department
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('department');
    this.userSubject.next(null); // Reset userSubject
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getLoggedInUserId(): string | null {
    return localStorage.getItem('loggedInUserId');
  }

  getDepartment(): string | null {
    return localStorage.getItem('department'); // Retrieve department from localStorage
  }
}
