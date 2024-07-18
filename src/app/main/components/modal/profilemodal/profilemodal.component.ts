import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../api-service.service';
import { AuthenticationService } from '../../../../authentication-service.service';

@Component({
  selector: 'app-profilemodal',
  templateUrl: './profilemodal.component.html',
  styleUrls: ['./profilemodal.component.scss']
})
export class ProfilemodalComponent implements OnInit {
  borrowedMaterials: any[] = []; // Initialize as array
  student: any = {};
  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    console.log('Profile modal component initialized');
    this.fetchBorrowedBooks();
    this.loadStudentProfile();
  }

  fetchBorrowedBooks(): void {
    console.log('Fetching borrowed books...');
    const userId = parseInt(this.authService.getLoggedInUserId() || '0');
    this.apiService.getBorrowedByUserId(userId).subscribe(
      (data: any) => {
        console.log('Borrowed books data:', data);
        this.borrowedMaterials = data.borrowedMaterials || [];
      },
      error => {
        console.error('Error fetching borrowed books:', error);
      }
    );
  }

  loadStudentProfile(): void {
    console.log('Loading student profile...');
    this.authService.user$.subscribe(user => {
      console.log('Student profile loaded:', user);
      this.student = user;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.borrowedMaterials.length / this.itemsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.itemsPerPage - 1, this.borrowedMaterials.length - 1);
  }

  get displayedBooks(): any[] {
    console.log('Calculating displayed books...');
    return this.borrowedMaterials.slice(this.startIndex, this.endIndex + 1);
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
