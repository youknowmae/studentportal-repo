import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service';
import { response } from 'express';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  
  constructor(private apiService: ApiService) { }  // Inject ApiService

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.apiService.getBooks()  // Call getBooks() from ApiService
      .subscribe(data => {
        this.books = data;
        console.log(this.books)
      });
  }
}