import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api-service.service';
import { AuthenticationService } from '../../../../authentication-service.service'; // Update path

@Component({
  selector: 'app-insidereserved',
  templateUrl: './insidereserved.component.html',
  styleUrl: './insidereserved.component.scss'
})
export class InsidereservedComponent {
  book: any = {};
  bookId: number | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!; // Use optional chaining or null check
  
    if (this.bookId !== null) { // Check if bookId is not null
      this.fetchBookDetails(this.bookId);
    }
  }

  fetchBookDetails(bookId: number): void {
    const authToken = this.authService.getToken(); 
    if (authToken) {
      const headers = { Authorization: `Bearer ${authToken}` }; 
      this.apiService.getBookById(bookId, headers) // Pass headers correctly
        .subscribe(
          (data) => {
            this.book = data;
          },
          (error) => {
            console.error('Error fetching book details:', error);
          }
        );
    } else {
      console.error('Authentication token not found.');
    }
  }

}
