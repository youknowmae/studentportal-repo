import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api-service.service';
import { AuthenticationService } from '../../../../authentication-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ReservemodalComponent } from '../../modal/reservemodal/reservemodal.component';

@Component({
  selector: 'app-insidebook',
  templateUrl: './insidebook.component.html',
  styleUrls: ['./insidebook.component.scss']
})
export class InsidebookComponent implements OnInit {
  book: any = {};
  accession: string | null = null;
  isReserved: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Get the accession from the route parameters
    this.route.params.subscribe(params => {
      this.accession = params['accession'];
      if (this.accession) {
        this.fetchBookDetails(this.accession);
        this.checkReservationStatus(this.accession);
      }
    });
  }

  fetchBookDetails(accession: string): void {
    // Fetch book details from the API
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

  checkReservationStatus(accession: string): void {
    // Check if the book is already reserved by the user
    const authToken = this.authService.getToken();
    if (authToken) {
      const headers = { Authorization: `Bearer ${authToken}` };
      this.apiService.checkReservationStatus(accession, headers)
        .subscribe(
          (data: any) => {
            this.isReserved = data.isReserved;
          },
          (error: any) => {
            console.error('Error checking reservation status:', error);
          }
        );
    } else {
      console.error('Authentication token not found.');
    }
  }

  openModal(): void {
    // Open reservation modal and pass accession to it
    const dialogRef = this.dialog.open(ReservemodalComponent, {
      data: { accession: this.accession }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
