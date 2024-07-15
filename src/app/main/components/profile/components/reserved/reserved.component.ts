import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../api-service.service';
import { AuthenticationService } from '../../../../../authentication-service.service';

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.scss']
})
export class ReservedComponent implements OnInit {
  book: any = {};
  reservations: any[] = [];
  queuePositions: any = {};

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Load reservations and queue positions
    this.loadReservations();
  }

  fetchBookDetails(accession: string): void {
    // Fetch book details from the API using accession
    const authToken = this.authService.getToken();
    if (authToken) {
      const headers = { Authorization: `Bearer ${authToken}` };
      this.apiService.getBookById(accession, headers)
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
    // Get user ID and fetch reservations
    const userId = parseInt(this.authService.getLoggedInUserId() || '0');
    this.apiService.getReservationsByUserId(userId).subscribe(
      (response: any) => {
        // Check if response has reservations array
        if (response && response.reservations && Array.isArray(response.reservations)) {
          this.reservations = response.reservations.map((reservation: any) => { // Explicitly type 'reservation' as 'any'
            // Ensure reservation.book exists and has title and authors
            if (reservation.book && reservation.book.title) {
              if (reservation.book.authors) {
                reservation.book.authors = JSON.parse(reservation.book.authors).join(', ');
              } else {
                reservation.book.authors = 'Unknown';
              }
            } else {
              // Handle case where book details are incomplete
              reservation.book = { title: 'Unknown', authors: 'Unknown' };
            }
            return reservation;
          });
        } else {
          console.error('Reservations array not found in response:', response);
          // Handle the case where reservations array is not present in response
          // You can clear or initialize this.reservations here based on your application logic
        }
      },
      (error) => {
        console.error('Error fetching reservations:', error);
        // Handle the error case (e.g., show an error message to the user)
      }
    );
  }

  viewReservationDetails(reservation: any): void {
    console.log('Viewing reservation:', reservation);
  }
}
