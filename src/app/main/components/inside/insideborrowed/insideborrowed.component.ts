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
  borrowedMaterial: any = {}; // Initialize borrowedMaterial object
  book: any = {}; // Initialize book object

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.paramMap.subscribe(params => {
      const id = params.get('id'); // Retrieve the 'id' parameter
      if (id && id !== 'null') { // Check if 'id' is not null or 'null' string
        this.fetchBorrowedMaterial(id); // Fetch borrowed material details
      } else {
        console.error('Invalid ID parameter:', id);
        // Optionally handle the case where 'id' is 'null' or invalid
      }
    });
  }

  fetchBorrowedMaterial(id: string): void {
    const authToken = this.authService.getToken();
    if (authToken) {
      const headers = { Authorization: `Bearer ${authToken}` };
      this.apiService.getBorrowedById(id)
        .subscribe(
          (data: any) => {
            this.borrowedMaterial = data.borrowedMaterial; // Assign fetched borrowed material data
            this.book = data.borrowedMaterial.material; // Assign associated book data
          },
          (error) => {
            console.error('Error fetching borrowed material details:', error);
          }
        );
    } else {
      console.error('Authentication token not found.');
    }
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ReservemodalComponent, {
      data: { accession: this.borrowedMaterial.book_id } // Pass accession instead of bookId
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
