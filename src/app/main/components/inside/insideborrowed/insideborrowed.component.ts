import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReservemodalComponent } from '../../modal/reservemodal/reservemodal.component';
import { ApiService } from '../../../../api-service.service';
import { AuthenticationService } from '../../../../authentication-service.service';

@Component({
  selector: 'app-insideborrowed',
  templateUrl: './insideborrowed.component.html',
  styleUrls: ['./insideborrowed.component.scss']
})
export class InsideborrowedComponent implements OnInit {
  book: any = {};
  accession: string | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.accession = this.route.snapshot.paramMap.get('accession');
    if (this.accession) {
      this.fetchBookDetails(this.accession);
    }
  }

  fetchBookDetails(accession: string): void {
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

  openModal(): void {
    const dialogRef = this.dialog.open(ReservemodalComponent, {
      data: { accession: this.accession } // Pass accession instead of bookId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
