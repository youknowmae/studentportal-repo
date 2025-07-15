import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { UserService } from './user.service';
import { appSettings } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrl = appSettings.apiUrlBase;
  // apiUrl = 'http://localhost:8000/api';

  // apiUrl = 'http://192.168.161.174:8000/api';

  authToken: string | null = null;
  loggedInUserId: string | null = null;
  department: string | null = null;
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); // Add this line
  public user$ = this.userSubject.asObservable(); // Add this line

  constructor(
    private http: HttpClient,
    private router: Router,
    private us: UserService
  ) {
    this.loadStoredUser(); // Initialize authentication state
  }

  private loadStoredUser(): void {
    const user = this.us.savedAuth;
    console.log(user);

    if (user) {
      const parsedUser = this.us.savedAuth;
      console.log(parsedUser);
      this.authToken = parsedUser.token;
      this.loggedInUserId = parsedUser.id;
      this.department = parsedUser.department;

      this.userSubject.next(parsedUser); // Update userSubject with full user details
    }
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login/student`, credentials)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            this.authToken = response.token;
            this.loggedInUserId = response.id.toString();
            this.department = response.department; // Update department

            // Store the full user data in localStorage
            sessionStorage.setItem('xs', this.us.encryptPayload(response));

            this.userSubject.next(response); // Update userSubject with user details
          }
        }),
        catchError((error) => {
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
    sessionStorage.clear();
    this.userSubject.next(null); // Reset userSubject
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    if (this.us.savedAuth) {
      return this.us.savedAuth.token; // Retrieve token from savedAuth
    } else return null;
  }

  getLoggedInUserId(): string | null {
    return this.us.savedAuth.id; // Retrieve user ID from savedAuth
  }

  getDepartment(): string | null {
    return this.us.savedAuth.department; // Retrieve department from savedAuth
  }
}
