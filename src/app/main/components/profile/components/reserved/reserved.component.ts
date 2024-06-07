// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ApiService } from '../../../../../api-service.service';
// import { AuthenticationService } from '../../../../../authentication-service.service';

// @Component({
//   selector: 'app-reserved',
//   templateUrl: './reserved.component.html',
//   styleUrls: ['./reserved.component.scss']
// })
// export class ReservedComponent implements OnInit {
//   book: any = {};
//   bookId: number | null = null;
//   reservations: any[] = [];
//   queuePositions: any = {};

//   constructor(
//     private apiService: ApiService,
//     private authService: AuthenticationService,
//     private route: ActivatedRoute
//   ) { }

//   ngOnInit(): void {
//     this.loadReservations();
    
//     if (this.bookId !== null) {
//       this.fetchBookDetails(this.bookId);
//     }

//     this.loadQueuePositions();
//   }

//   fetchBookDetails(bookId: number): void {
//     const authToken = this.authService.getToken();
//     if (authToken) {
//       const headers = { Authorization: `Bearer ${authToken}` };
//       this.apiService.getBookById(bookId, headers)
//         .subscribe(
//           (data) => {
//             this.book = data;
//           },
//           (error) => {
//             console.error('Error fetching book details:', error);
//           }
//         );
//     } else {
//       console.error('Authentication token not found.');
//     }
//   }

//   loadReservations(): void {
//     // Use the new method to get reservations by user ID
//     const userId = parseInt(this.authService.getLoggedInUserId() || '0');
//     this.apiService.getUserById(userId).subscribe(
//       (reservations: any[]) => {
//         // Ensure the response is an array
//         if (Array.isArray(reservations)) {
//           this.reservations = reservations.map(reservation => {
//               // Ensure authors are formatted properly
//               reservation.book.authors = JSON.parse(reservation.book.authors).join(', ');
//               return reservation;
//           });;
//         } else {
//           console.error('Reservations response is not an array:', reservations);
//         }
//       },
//       (error) => {
//         console.error('Error fetching reservations:', error);
//       }
//     );
//   }


//   loadQueuePositions(): void {
//     this.apiService.getQueuePosition().subscribe(
//       (positions) => {
//         this.queuePositions = positions;
//       },
//       (error) => {
//         console.error('Error fetching queue positions:', error);
//       }
//     );
//   }

//   viewReservationDetails(reservation: any): void {
//     console.log('Viewing reservation:', reservation);
//   }
// }
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
      (reservations: any[]) => {
        // Ensure the response is an array
        if (Array.isArray(reservations)) {
          this.reservations = reservations.map(reservation => {
              // Ensure authors are formatted properly
              reservation.book.authors = JSON.parse(reservation.book.authors).join(', ');
              return reservation;
          });
        } else {
          console.error('Reservations response is not an array:', reservations);
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
