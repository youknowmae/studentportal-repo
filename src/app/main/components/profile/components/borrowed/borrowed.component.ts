import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service'; // Update the path
import { AuthenticationService } from '../../../../../authentication-service.service'; // Update the path

@Component({
  selector: 'app-borrowed',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.scss']
})
export class BorrowedComponent implements OnInit {

  borrowedItems: any[] = []; // Define an array to store borrowed items

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.fetchBorrowedItems();
  }

  fetchBorrowedItems(): void {
    // Get the logged-in user's ID
    const userId = this.authService.getLoggedInUserId();

    if (!userId) {
      console.error('User ID not found');
      return;
    }

    // Assuming you have a method in your ApiService to fetch borrowed items
    this.apiService.getBorrowedByUserId(parseInt(userId)).subscribe(
      (data) => {
        this.borrowedItems = data; // Assign the fetched data to borrowedItems array
      },
      (error) => {
        console.error('Error fetching borrowed items:', error);
      }
    );
  }
}
