import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '.././api-service.service'; // Assuming ApiService is the correct service name

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