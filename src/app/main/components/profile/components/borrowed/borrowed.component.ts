import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service';
import { AuthenticationService } from '../../../../../authentication-service.service';

@Component({
  selector: 'app-borrowed',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.scss']
})
export class BorrowedComponent implements OnInit {

  borrowedItems: any[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.fetchBorrowedItems();
  }

  fetchBorrowedItems(): void {
    const userId = this.authService.getLoggedInUserId();

    if (!userId) {
      console.error('User ID not found');
      return;
    }

    this.apiService.getBorrowedByUserId(parseInt(userId)).subscribe(
      (response: any) => {
        // Check if the response has the expected structure
        if (response && response.borrowedMaterials && Array.isArray(response.borrowedMaterials)) {
          this.borrowedItems = response.borrowedMaterials.map((item: any) => {
            if (item.material && item.material.authors) {
              try {
                item.material.authors = JSON.parse(item.material.authors);
              } catch (e) {
                console.error('Failed to parse authors:', e);
                item.material.authors = [item.material.authors]; // Assume it's already a string
              }
            }
            return item;
          });
        } else {
          console.error('Invalid API response structure:', response);
        }
      },
      (error) => {
        console.error('Error fetching borrowed items:', error);
      }
    );
  }
}
