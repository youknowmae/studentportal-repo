import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl = 'http://localhost:8000/api';
  authToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.authToken = localStorage.getItem('authToken');
  }

  login(credentials: { username: string, password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login/student`, credentials)
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.authToken = response.token;
            if (this.authToken) {
              localStorage.setItem('authToken', this.authToken);
            }
            localStorage.setItem('department', response.department);
          }
        })
      );
  }
  logout() {
    this.authToken = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('department');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.authToken;
  }
}