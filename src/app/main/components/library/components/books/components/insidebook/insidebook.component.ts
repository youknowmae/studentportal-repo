import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../../api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insidebook',
  templateUrl: './insidebook.component.html',
  styleUrls: ['./insidebook.component.scss']
})
export class InsidebookComponent implements OnInit {
  book: any = {}; // Declare an empty object for book
  bookId: number | null = null; // Declare a variable to store book ID

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the book ID from the route parameters
    this.bookId = +this.route.snapshot.paramMap.get('id')!; // Convert string to number

    if (this.bookId) {
      this.fetchBookDetails(this.bookId);
    }
  }

  fetchBookDetails(bookId: number): void {
    this.apiService.getBookById(bookId) // Assume you have a method to get book by ID
      .subscribe(data => {
        this.book = data;
      });
  }
}