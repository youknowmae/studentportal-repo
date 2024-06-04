import { Component } from '@angular/core';
import { ApiService } from '../../../api-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
  periodicalList: string[] = ['Periodical', 'Journal', 'Magazine', 'Newspaper'];
  selectedOption: any;
  searchQuery: string = '';
  searchResults: Observable<any[]> | null = null;
  selectedCategory: string = 'books'; // Default category

  constructor(private apiService: ApiService) {}

  // Method to handle search
  handleSearch() {
    if (this.searchQuery.trim()) {
      // If search query is empty, reset search results
      this.searchResults = null;
      return;
    }

    // Fetch data based on the selected category
    switch (this.selectedCategory) {
      case 'books':
        this.searchResults = this.apiService.searchBooks(this.searchQuery);
        break;
      case 'articles':
        this.searchResults = this.apiService.searchArticles(this.searchQuery);
        break;
      case 'periodicals':
        this.searchResults = this.apiService.searchPeriodicals(this.searchQuery);
        break;
      case 'academic':
        this.searchResults = this.apiService.searchProjects(this.searchQuery);
        break;
      default:
        break;
    }
  }

  // Method to set active button
  setActive(category: string) {
    this.selectedCategory = category;
  }
}
