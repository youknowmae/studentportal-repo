import { Component } from '@angular/core';
import { ApiService } from '../../../api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  apiUrl: string = "http://localhost:8000/api"; // Make sure your API URL is complete
  articles: any[] = [];
  books: any[] = [];
  periodicals: any[] = [];
  projects: any[] = [];

  constructor(
    private apiService: ApiService
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
}
