import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.apiService.getArticles().subscribe(
      (data: any[]) => {
        this.articles = data;
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }
}
