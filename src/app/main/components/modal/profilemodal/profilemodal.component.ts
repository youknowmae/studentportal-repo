import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api-service.service';
import { AuthenticationService } from '../../../../authentication-service.service';

@Component({
  selector: 'app-profilemodal',
  templateUrl: './profilemodal.component.html',
  styleUrls: ['./profilemodal.component.scss']
})
export class ProfilemodalComponent implements OnInit {
  books: any[] = [];
  student: any = {};
  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.fetchBorrowedBooks();
    this.loadStudentProfile();
  }

  fetchBorrowedBooks(): void {
    const userId = parseInt(this.authService.getLoggedInUserId() || '0');
    this.apiService.getBorrowedByUserId(userId).subscribe(
      data => {
        this.books = data;
      },
      error => {
        console.error('Error fetching borrowed books:', error);
      }
    );
  }

  loadStudentProfile(): void {
    this.authService.user$.subscribe(user => {
      this.student = user;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.books.length / this.itemsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.itemsPerPage - 1, this.books.length - 1);
  }

  get displayedBooks(): any[] {
    return this.books.slice(this.startIndex, this.endIndex + 1);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  getPaginationSummary(): string {
    return `Page ${this.currentPage} of ${this.totalPages}`;
  }
}
