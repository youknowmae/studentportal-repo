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
  book: any = {};
  accession: string | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
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
}
