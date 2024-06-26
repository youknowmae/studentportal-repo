import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api-service.service'; // Assuming ApiService is the correct service name
import { AuthenticationService } from '../authentication-service.service'; // Assuming AuthenticationService is the correct service name
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  apiUrl: string = "http://localhost:8000/api";

  articles: any[] = [];
  books: any[] = [];
  periodicals: any[] = [];
  projects: any[] = [];
  isVisible: boolean | undefined;
  selectedProject: any;
  project: any;
  user: any;
  isSidebarHidden = false;
  currentRoute: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
    private router: Router,
    private dialogRef: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchData();
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
    });
  }

  fetchData(): void {
    this.apiService.getArticles().subscribe(data => {
      this.articles = data;
    });
    this.apiService.getBooks().subscribe(data => {
      this.books = data;
    });
    this.apiService.getPeriodicals().subscribe(data => {
      this.periodicals = data;
    });
    this.apiService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  openProjectModal(project: any): void {
    this.selectedProject = project;
    this.isVisible = true;
  }

  toggleSidebar(): void {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#31A463',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.snackBar.open('Log out successful','Close', {
          duration: 1500,
          verticalPosition: 'bottom',
          horizontalPosition: 'center'
        });
        // Redirect to login page after showing the snackbar
        this.router.navigate(['/login']);
      } else {
        console.log('User canceled logout');
      }
    });
  }
}
