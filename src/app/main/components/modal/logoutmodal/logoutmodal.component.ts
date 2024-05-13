import { Component } from '@angular/core';
import { AuthenticationService } from '../../../../authentication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logoutmodal',
  templateUrl: './logoutmodal.component.html',
  styleUrl: './logoutmodal.component.scss'
})
export class LogoutmodalComponent {
  showModal = true;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.showModal = false;
  }

  closeModal(): void {
    this.showModal = false;
  }

}
