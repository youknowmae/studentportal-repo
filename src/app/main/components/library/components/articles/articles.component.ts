import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  paginatedArticles: any[] = [];
  currentPage: number = 1;
  articlesPerPage: number = 4;
  selectedMaterialType: string = '';
  loading: boolean = false; // Add loading variable

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.loading = true; // Set loading to true when fetching articles
    if (this.selectedMaterialType) {
      this.apiService.getArticlesByMaterialType(this.selectedMaterialType).subscribe(
        (data: any[]) => {
          this.articles = data;
          this.updatePaginatedArticles();
          this.loading = false; // Set loading to false when articles are fetched
        },
        (error) => {
          console.error('Error fetching articles by material type:', error);
          this.loading = false; // Set loading to false in case of error
        }
      );
    } else {
      this.apiService.getArticles().subscribe(
        (data: any[]) => {
          this.articles = data;
          this.updatePaginatedArticles();
          this.loading = false; // Set loading to false when articles are fetched
        },
        (error) => {
          console.error('Error fetching articles:', error);
          this.loading = false; // Set loading to false in case of error
        }
      );
    }
  }

  updatePaginatedArticles(): void {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    this.paginatedArticles = this.articles.slice(startIndex, endIndex);
  }

  onMaterialTypeChange(event: any): void {
    this.selectedMaterialType = event.target.value;
    this.fetchArticles();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedArticles();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedArticles();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedArticles();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.articles.length / this.articlesPerPage);
  }
  get pages(): number[] {
    return [this.currentPage];
  }
}
