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
  searchQuery: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.loading = true;
    if (this.searchQuery) {
      this.apiService.searchBooks(this.searchQuery).subscribe(
        (data: any[]) => {
          this.books = data;
          this.updatePaginatedBooks();
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching books:', error);
          this.loading = false;
        }
      );
    } else {
      this.apiService.getBooks().subscribe(
        (data: any[]) => {
          this.books = data;
          this.updatePaginatedBooks();
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching books:', error);
          this.loading = false;
        }
      );
    }
  }
  onSearchChange(event: Event): void {
    this.currentPage = 1;
    this.fetchBooks();
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
