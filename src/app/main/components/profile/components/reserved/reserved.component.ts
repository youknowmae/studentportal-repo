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

  fetchBookDetails(accession: string, callback: (data: any) => void): void {
    // Fetch book details from the API using accession
    const authToken = this.authService.getToken();
    if (authToken) {
      const headers = { Authorization: `Bearer ${authToken}` };
      this.apiService.getBookById(accession, headers)
        .subscribe(
          (data) => {
            callback(data);
          },
          (error) => {
            console.error('Error fetching book details:', error);
            callback({ title: 'Unknown', authors: 'Unknown' });
          }
        );
    } else {
      console.error('Authentication token not found.');
      callback({ title: 'Unknown', authors: 'Unknown' });
    }
  }

  loadReservations(): void {
    // Get user ID and fetch reservations
    const userId = parseInt(this.authService.getLoggedInUserId() || '0', 10);
    this.apiService.getReservationsByUserId(userId).subscribe(
      (response: any) => {
        // Check if response has reservations array
        if (response && response.reservations && Array.isArray(response.reservations)) {
          this.reservations = response.reservations;
          this.reservations.forEach(reservation => {
            this.fetchBookDetails(reservation.book_id, (bookData) => {
              reservation.book = bookData;
              if (reservation.book.authors) {
                try {
                  reservation.book.authors = JSON.parse(reservation.book.authors).join(', ');
                } catch (e) {
                  reservation.book.authors = reservation.book.authors; // Assume it's already a string
                }
              } else {
                reservation.book.authors = 'Unknown';
              }
            });
          });
        } else {
          console.error('Reservations array not found in response:', response);
        }
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  viewReservationDetails(reservation: any): void {
    console.log('Viewing reservation:', reservation);
  }
}
