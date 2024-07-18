import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api-service.service';
import { AuthenticationService } from '../../../../authentication-service.service';

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
}
