import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // apiUrl = 'http://localhost:8000/api';
  apiUrl = 'http://192.168.68.124:8000/api';

  authToken: string | null = null;
  loggedInUserId: string | null = null;
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); // Add this line
  public user$ = this.userSubject.asObservable(); // Add this line

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(credentials: { username: string, password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          console.log('API Response:', response);
  
          if (response && response.token) {
            this.authToken = response.token;
            this.loggedInUserId = response.id.toString();
            const department = response.department.department;
  
            if (this.authToken) {
              localStorage.setItem('authToken', this.authToken);
            }
            if (this.loggedInUserId) {
              localStorage.setItem('loggedInUserId', this.loggedInUserId);
            }
            if (department) {
              localStorage.setItem('department', department);
            }

            this.userSubject.next(response); // Update userSubject with user details
          }
        })
      );
  }

  logout() {
    this.authToken = null;
    this.loggedInUserId = null;
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
    return localStorage.getItem('department');
  }
}
