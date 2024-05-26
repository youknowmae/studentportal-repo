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
  selectedMaterialTypeLabel: string = 'Select Material Type'; // Default label
  loading: boolean = false;
  searchQuery: string = ''; // Add this property

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.loading = true; // Set loading to true when fetching articles
    if (this.searchQuery) {
      this.apiService.searchArticles(this.searchQuery).subscribe(
        (data: any[]) => {
          this.articles = data;
          this.updatePaginatedArticles();
          this.loading = false; // Set loading to false when articles are fetched
        },
        (error) => {
          console.error('Error fetching articles by search query:', error);
          this.loading = false; // Set loading to false in case of error
        }
      );
    } else if (this.selectedMaterialType) {
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

  onMaterialTypeChange(event: Event, type: string): void {
    event.preventDefault(); // Prevent default anchor behavior
    this.selectedMaterialType = type;
    this.fetchArticles();
    this.updateMaterialTypeLabel(type); // Update the button label
  }

  updateMaterialTypeLabel(type: string): void {
    switch (type) {
      case 'journal':
        this.selectedMaterialTypeLabel = 'Journal';
        break;
      case 'magazine':
        this.selectedMaterialTypeLabel = 'Magazine';
        break;
      case 'newspaper':
        this.selectedMaterialTypeLabel = 'Newspaper';
        break;
      default:
        this.selectedMaterialTypeLabel = 'All';
        break;
    }
  }

  onSearchChange(event: Event): void {
    this.currentPage = 1; // Reset to first page
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
}
