// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ApiService } from '../../../../api-service.service'; // Adjust the path as needed
// import { AuthenticationService } from '../../../../authentication-service.service';


// @Component({
//   selector: 'app-reservemodal',
//   templateUrl: './reservemodal.component.html',
//   styleUrls: ['./reservemodal.component.scss']
// })
// export class ReservemodalComponent implements OnInit {
//   reservationForm: FormGroup;

//   constructor(private fb: FormBuilder, private apiService: ApiService, private authService: AuthenticationService) {
//     this.reservationForm = this.fb.group({
//       fullName: ['', Validators.required],
//       studentNumber: ['', Validators.required],
//       department: ['', Validators.required],
//       patronType: ['', Validators.required],
//       title: ['', Validators.required],
//       author: ['', Validators.required],
//       location: ['', Validators.required],
//       numberOfBooks: ['', Validators.required],
//       fines: ['', Validators.required],
//       dateRequest: ['', Validators.required],
//       dateOfExpiration: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.fetchUserData();
//     this.fetchBookData(1); // Replace 1 with the actual book ID or parameterize this
//   }

//   fetchUserData(): void {
//     this.apiService.getReservationsByLoggedInUser().subscribe(data => {
//       if (data && data.length > 0) {
//         const user = data[0].user;
//         if (user) {
//           const userInfo = {
//             fullName: `${user.first_name} ${user.last_name}`,
//             studentNumber: user.studentNumber,
//             department: this.apiService.getDepartment(),
//             patronType: user.role
//           };
//           this.fillUserInfo(userInfo);
//         } else {
//           console.error('User object is null or undefined');
//         }
//       } else {
//         console.error('No user data found');
//       }
//     }, error => {
//       console.error('Error fetching user data', error);
//     });
//   }

  // fetchBookData(bookId: number): void {
  //   const authToken = this.authService.getToken(); // Retrieve the authentication token
  //   if (!authToken) {
  //     console.error('Authentication token is missing. Please log in again.');
  //     // Handle the case where the authentication token is missing, such as redirecting to the login page
  //     return;
  //   }
  
  //   this.apiService.getBookById(bookId, { 'Authorization': `Bearer ${authToken}` }).subscribe(data => {
  //     if (data) {
  //       const selectedBook = {
  //         title: data.title,
  //         author: data.author,
  //         location: data.location
  //       };
  //       this.fillBookInfo(selectedBook);
  //     } else {
  //       console.error('No book data found');
  //     }
  //   }, error => {
  //     if (error.status === 401) {
  //       console.error('Unauthorized error. Please log in again.');
  //       // Handle unauthorized error, such as redirecting to the login page
  //     } else {
  //       console.error('Error fetching book data', error);
  //     }
  //   });
  // }
  

//   fillUserInfo(userInfo: any): void {
//     this.reservationForm.patchValue({
//       fullName: userInfo.fullName,
//       studentNumber: userInfo.studentNumber,
//       department: userInfo.department,
//       patronType: userInfo.patronType
//     });
//   }

//   fillBookInfo(selectedBook: any): void {
//     this.reservationForm.patchValue({
//       title: selectedBook.title,
//       author: selectedBook.author,
//       location: selectedBook.location
//     });
//   }

//   onSubmit(): void {
//     if (this.reservationForm.valid) {
//       console.log('Form Submitted', this.reservationForm.value);
//       // Handle form submission logic
//     } else {
//       console.error('Form is invalid');
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../api-service.service'; // Adjust the path as needed
import { AuthenticationService } from '../../../../authentication-service.service'; // Adjust the path as needed

@Component({
  selector: 'app-reservemodal',
  templateUrl: './reservemodal.component.html',
  styleUrls: ['./reservemodal.component.scss']
})
export class ReservemodalComponent implements OnInit {
  reservationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthenticationService
  ) {
    this.reservationForm = this.fb.group({
      fullName: ['', Validators.required],
      id: ['', Validators.required],
      department: ['', Validators.required],
      patronType: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      language: ['', Validators.required],
      numberOfBooks: ['', Validators.required],
      fines: ['', Validators.required],
      dateRequest: ['', Validators.required],
      dateOfExpiration: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
    this.fetchBookData(1); // Replace 1 with the actual book ID or parameterize this
  }

  fetchUserData(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        const userInfo = {
          fullName: `${user.first_name} ${user.middle_name} ${user.last_name} `,
          id: user.id,
          department: this.authService.getDepartment(),
          patronType: user.role
        };
        this.fillUserInfo(userInfo);
      } else {
        console.error('No user data found');
      }
    });
  }

  fetchBookData(bookId: number): void {
    const authToken = this.authService.getToken(); // Retrieve the authentication token
    if (!authToken) {
      console.error('Authentication token is missing. Please log in again.');
      // Handle the case where the authentication token is missing, such as redirecting to the login page
      return;
    }
  
    this.apiService.getBookById(bookId, { 'Authorization': `Bearer ${authToken}` }).subscribe(data => {
      if (data) {
        const selectedBook = {
          title: data.title,
          author: data.author,
          language: data.language
        };
        this.fillBookInfo(selectedBook);
      } else {
        console.error('No book data found');
      }
    }, error => {
      if (error.status === 401) {
        console.error('Unauthorized error. Please log in again.');
        // Handle unauthorized error, such as redirecting to the login page
      } else {
        console.error('Error fetching book data', error);
      }
    });
  }

  fillUserInfo(userInfo: any): void {
    this.reservationForm.patchValue({
      fullName: userInfo.fullName,
      id: userInfo.id,
      department: userInfo.department,
      patronType: userInfo.patronType
    });
  }

  fillBookInfo(selectedBook: any): void {
    this.reservationForm.patchValue({
      title: selectedBook.title,
      author: selectedBook.author,
      language: selectedBook.language
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      console.log('Form Submitted', this.reservationForm.value);
      // Handle form submission logic
    } else {
      console.error('Form is invalid');
    }
  }
}