import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';  // Change from email to username
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router) { }

  login() {
    const credentials = { username: this.username, password: this.password };  // Update here

    this.authService.login(credentials).subscribe(
      response => {
        console.log('Login successful:', response);
        this.router.navigate(['/main']);
      },
      error => {
        console.error('Login error:', error);
        this.errorMessage = error.error.message;
      }
    );
  }

  visible: boolean = true;
  changetype: boolean = true;

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }
}