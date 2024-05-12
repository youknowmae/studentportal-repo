import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '.././api-service.service'; // Assuming ApiService is the correct service name
import { AuthenticationService } from '.././authentication-service.service'; // Assuming AuthenticationService is the correct service name
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  apiUrl: string = "http://localhost:8000/api"; // Make sure your API URL is complete
  articles: any[] = [];
  books: any[] = [];
  periodicals: any[] = [];
  projects: any[] = [];
  isVisible: boolean | undefined;
  selectedProject: any;
project: any;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchData();
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Navigate to the login page
  }

    // Method to open the modal and pass the selected project data
    openProjectModal(project: any): void {
      this.selectedProject = project;
      this.isVisible = true;
    }
    
    closeModal(): void {
      this.isVisible = false;
    }
}