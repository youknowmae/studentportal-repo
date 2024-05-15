import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  selectedMaterialType: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    if (this.selectedMaterialType) {
      this.apiService.getArticlesByMaterialType(this.selectedMaterialType).subscribe(
        (data: any[]) => {
          this.articles = data;
        },
        (error) => {
          console.error('Error fetching articles by material type:', error);
        }
      );
    } else {
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

  onMaterialTypeChange(event: any): void {
    this.selectedMaterialType = event.target.value;
    this.fetchArticles();
  }
}
