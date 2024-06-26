import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router, private snackBar: MatSnackBar) { }

  login() {
    const credentials = { username: this.username, password: this.password };

    this.authService.login(credentials).subscribe(
      response => {
        console.log('Login successful:', response);

        // Get the logged-in user ID after successful login
        const loggedInUserId = this.authService.getLoggedInUserId();
        console.log('Logged-in user ID:', loggedInUserId);

        // Show welcome notification
        this.snackBar.open('Welcome to the Library Student Portal', 'Close', {
          duration: 1500,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });

        // Navigate to the main page
        this.router.navigate(['/main']);
      },
      error => {
        console.error('Login error:', error);
        this.errorMessage = error.error.message || 'An error occurred during login.';

        // Show error notification
        this.snackBar.open(this.errorMessage, 'Close', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar']  // Optional: Add custom class for styling
        });
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
