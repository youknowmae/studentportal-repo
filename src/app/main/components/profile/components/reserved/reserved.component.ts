
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service'; // Update the path to your ApiService

@Component({
  selector: 'app-reserved',
  templateUrl: './reserved.component.html',
  styleUrls: ['./reserved.component.scss']
})
export class ReservedComponent implements OnInit {
  reservations: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadReservations();
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

  viewReservationDetails(reservation: any): void {
    // Implement logic to view reservation details
    console.log('Viewing reservation:', reservation);
  }
}