import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReservemodalComponent } from '../../modal/reservemodal/reservemodal.component';
import { ApiService } from '../../../../api-service.service';
import { AuthenticationService } from '../../../../authentication-service.service';

@Component({
  selector: 'app-insideborrowed',
  templateUrl: './insideborrowed.component.html',
  styleUrls: ['./insideborrowed.component.scss'] // Use styleUrls instead of styleUrl
})
export class InsideborrowedComponent implements OnInit {
  book: any = {};
  bookId: number | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('id')!;

    if (this.bookId !== null) {
      this.fetchBookDetails(this.bookId);
    }
  }

  fetchBookDetails(bookId: number): void {
    const authToken = this.authService.getToken();
    if (authToken) {
      const headers = { Authorization: `Bearer ${authToken}` };
      this.apiService.getBookById(bookId, headers)
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
      data: { bookId: this.bookId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
