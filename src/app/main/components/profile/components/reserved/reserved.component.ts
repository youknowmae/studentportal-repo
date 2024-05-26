import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service'; // Update the path to your ApiService
import { AuthenticationService } from '../../../../../authentication-service.service';


@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.scss']
})
export class ReservedComponent implements OnInit {
  book: any = {};
  bookId: number | null = null;
  reservations: any[] = [];
  queuePositions: any = {};
  route: any;

  constructor(private apiService: ApiService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loadReservations();
    this.bookId = +this.route.snapshot.paramMap.get('id')!; // Use optional chaining or null check
  
    if (this.bookId !== null) { // Check if bookId is not null
      this.fetchBookDetails(this.bookId);
    }

    this.loadQueuePositions();
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

  loadReservations(): void {
    this.apiService.getReservationsByLoggedInUser().subscribe(
      (reservations: any[]) => {
        this.reservations = reservations;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  loadQueuePositions(): void {
    this.apiService.getQueuePosition().subscribe(
      (positions) => {
        this.queuePositions = positions;
      },
      (error) => {
        console.error('Error fetching queue positions:', error);
      }
    );
  }

  viewReservationDetails(reservation: any): void {
    // Implement logic to view reservation details
    console.log('Viewing reservation:', reservation);
  }
}