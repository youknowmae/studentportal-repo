import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '.././api-service.service'; // Assuming ApiService is the correct service name
import { AuthenticationService } from '.././authentication-service.service'; // Assuming AuthenticationService is the correct service name
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  apiUrl: string = "http://192.168.68.124:8000/api"; // Make sure your API URL is complete
  // apiUrl: string = "http://localhost:8000/api";
  articles: any[] = [];
  books: any[] = [];
  periodicals: any[] = [];
  projects: any[] = [];
  isVisible: boolean | undefined;
  selectedProject: any;
  project: any;
  user: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
    private router: Router,
    private dialogRef: MatDialog 
  ) { }

  ngOnInit(): void {
    this.fetchData();
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
    });
  }

  fetchData(): void {
    this.apiService.getArticles()
      .subscribe(data => {
        this.articles = data;
      });

    this.apiService.getBooks()
      .subscribe(data => {
        this.books = data;
      });

    this.apiService.getPeriodicals()
      .subscribe(data => {
        this.periodicals = data;
      });

    this.apiService.getProjects()
      .subscribe(data => {
        this.projects = data;
      });
  }
    openProjectModal(project: any): void {
      this.selectedProject = project;
      this.isVisible = true;
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
          // Redirect to login page if logout is confirmed
          this.router.navigate(['/login']);
        } else {
          // Stay on the dashboard if logout is not confirmed
          console.log('User canceled logout');
        }
      });
    }
  
}