import { Component } from '@angular/core';
import { ApiService } from '../../../../../api-service.service';


@Component({
  selector: 'app-insideborrowed',
  templateUrl: './insideborrowed.component.html',
  styleUrl: './insideborrowed.component.scss'
})
export class InsideborrowedComponent {
  }

//   constructor(private apiService: ApiService) { }

//   fetchBooks(): void {
//     this.apiService.getBooks()  // Call getBooks() from ApiService
//       .subscribe(data => {
//         this.books = data;
//         console.log(this.books)
//       });
//   }
// }
// }
// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';
// // import { ApiService } from '../../../../../api-service.service'; // Replace 'path/to/api.service' with the actual path
// // import { AuthenticationService } from '../../../../../authentication-service.service'; // Replace 'path/to/authentication-service.service' with the actual path

// // @Component({
// //   selector: 'app-insideborrowed',
// //   templateUrl: './insideborrowed.component.html',
// //   styleUrl: './insideborrowed.component.scss'
// // })
// // export class InsideborrowedComponent implements OnInit {
// //   book: any;

// //   constructor(
// //     private route: ActivatedRoute,
// //     private apiService: ApiService,
// //     private authService: AuthenticationService
// //   ) { }

// //   ngOnInit(): void {
// //     this.getBookDetails();
// //   }

// //   getBookDetails(): void {
// //     const paramMap = this.route.snapshot.paramMap;
// //     if (paramMap) {
// //       const id = +paramMap.get('id');
// //       this.apiService.getBookById(id)
// //         .subscribe(book => this.book = book);
// //     }
// //   }

// //   openModal(): void {
// //     // Implement your modal opening logic here
// //   }
// // }
