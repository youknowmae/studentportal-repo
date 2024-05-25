import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  paginatedBooks: any[] = [];
  currentPage: number = 1;
  booksPerPage: number = 6;
  loading: boolean = true; // Add loading flag and initialize as true

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.loading = true; // Set loading to true when fetching data
    this.apiService.getBooks().subscribe(data => {
      this.books = data;
      this.updatePaginatedBooks();
      this.loading = false; // Set loading to false when data is fetched
    });
  }

  updatePaginatedBooks(): void {
    const startIndex = (this.currentPage - 1) * this.booksPerPage;
    const endIndex = startIndex + this.booksPerPage;
    this.paginatedBooks = this.books.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedBooks();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedBooks();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedBooks();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.books.length / this.booksPerPage);
  }

  get pages(): number[] {
    return [this.currentPage];
  }
}
