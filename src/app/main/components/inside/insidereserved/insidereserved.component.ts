import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api-service.service';
import { AuthenticationService } from '../../../../authentication-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insidereserved',
  templateUrl: './insidereserved.component.html',
  styleUrls: ['./insidereserved.component.scss']
})
export class InsidereservedComponent implements OnInit {
  reservation: any = {};
  book: any = {};

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router // Inject Router here
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Fetched id from route:', id); // Log the id from the route
      if (id) {
        this.fetchReservationDetails(id);
      }
    });
  }

  fetchReservationDetails(id: string): void {
    this.apiService.getReservationById(id).subscribe(
      (data) => {
        console.log('Fetched reservation:', data); // Log the reservation data
        this.reservation = data;
        this.book = this.reservation.book; // Set book directly from reservation object

        // Parse authors from JSON string to array and join them into a string
        if (this.book.authors) {
          try {
            const authorsArray = JSON.parse(this.book.authors);
            this.book.authors = authorsArray.join(', ');
          } catch (e) {
            console.error('Error parsing authors:', e);
          }
        }

        console.log('Book details from reservation:', this.book); // Log the book details
      },
      (error) => {
        console.error('Error fetching reservation details:', error);
      }
    );
  }

  cancelReservation(): void {
    const reservationId = this.reservation.id; // Assuming you have reservation ID from fetched data
    if (!reservationId) {
      console.error('Reservation ID not available');
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this reservation?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.cancelReservation(reservationId).subscribe(
          (response) => {
            if (response && response.message === 'Reservation canceled successfully') {
              Swal.fire(
                'Canceled!',
                'Your reservation has been canceled.',
                'success'
              );
              console.log('Reservation canceled:', response);
              // Navigate away after successful cancellation
              this.router.navigate(['/main/profile/reserved']);
            } else {
              Swal.fire(
                'Unexpected Response!',
                'The cancellation was successful, but the response was unexpected.',
                'warning'
              );
              console.error('Unexpected response:', response);
            }
          },
          (error) => {
            let errorMessage = 'Error canceling reservation';
            if (error.error && error.error.error) {
              errorMessage = error.error.error; // Use backend error message
            } else if (error.message) {
              errorMessage = error.message; // Fallback to HttpErrorResponse message
            }
  
            Swal.fire(
              'Error!',
              errorMessage,
              'error'
            );
            console.error('Error canceling reservation:', error);
          }
        );
      }
    });
  }
}
