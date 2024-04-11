import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  
  login() {
    const credentials = { username: this.email, password: this.password };

    this.http.post<any>('http://127.0.0.1:8000/api/login/student', credentials)
      .subscribe(
        response => {
          console.log('Login successful:', response);
          console.log(response.token) //save nyo nlang yung token and department
          console.log(response.department)
          this.router.navigate(['/main']); // Redirect to /main upon successful login
        },
        error => {
          console.error('Login error:', error);
          this.errorMessage = error.error.message;
        }
      );
  }

  visible:boolean = true;
  changetype:boolean = true;

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}
