import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../api-service.service';
import { AuthenticationService } from '../../../../authentication-service.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-reservemodal',
  templateUrl: './reservemodal.component.html',
  styleUrls: ['./reservemodal.component.scss']
})
export class ReservemodalComponent implements OnInit {
  reservationForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedBookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedBookId = data.bookId;
    this.reservationForm = this.fb.group({
      fullName: ['', Validators.required],
      id: ['', Validators.required],
      department: ['', Validators.required],
      // patronType: ['', Validators.required],
      title: ['', Validators.required],
      authors: ['', Validators.required],
      // location: ['', Validators.required],
      numberOfBooks: ['', [Validators.required, Validators.min(1)]],
      fine: ['', [Validators.required, Validators.min(0)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      status:[1,[Validators.required]],
      type: ['online',[Validators.required]],
    
    });
    
  }

  ngOnInit(): void {
    this.fetchUserData();
    if (this.selectedBookId !== null) {
      this.fetchBookData(this.selectedBookId);
    }
  }

  fetchUserData(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        const userInfo = {
          fullName: `${user.first_name} ${user.middle_name} ${user.last_name} `,
          id: user.id,
          department: this.authService.getDepartment(),
          // patronType: user.role
        };
        this.fillUserInfo(userInfo);
      } else {
        console.error('No user data found');
      }
    });
  }

  fetchBookData(bookId: number): void {
    const authToken = this.authService.getToken();
    if (!authToken) {
      console.error('Authentication token is missing. Please log in again.');
      return;
    }
  
    this.apiService.getBookById(bookId, { 'Authorization': `Bearer ${authToken}` }).subscribe(data => {
      if (data) {
        const selectedBook = {
          title: data.title,
          authors: data.authors,
          // location: data.location
          fine: data.fine,
        };
        this.fillBookInfo(selectedBook);
      } else {
        console.error('No book data found');
      }
    }, error => {
      if (error.status === 401) {
        console.error('Unauthorized error. Please log in again.');
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
      // patronType: userInfo.patronType
    });
  }

  fillBookInfo(selectedBook: any): void {
    this.reservationForm.patchValue({
      title: selectedBook.title,
      authors: selectedBook.authors,
      // location: selectedBook.location
      fine: selectedBook.fine,

    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid && this.selectedBookId !== null) {
      const reservationData = this.reservationForm.value;
      const requestData = {
        user_id: reservationData.id,
        book_id: this.selectedBookId,
        start_date: reservationData.start_date,
        end_date: reservationData.end_date,
        fine: reservationData.fine,
        status: reservationData.status,
        type: reservationData.type
      };
            
  
      this.apiService.createReservation(requestData).subscribe(
        
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Reservation created successfully',
          });
          this.reservationForm.reset();
          
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to create reservation',
          });
        }
      );
    } else {
      console.error('Form is invalid or no book selected');
    }
  }
  

// onSubmit(): void {
//   console.log('Form Valid:', this.reservationForm.valid);
//   console.log('Selected Book ID:', this.selectedBookId);
//   console.log('Form Values:', this.reservationForm.value);

//   if (this.reservationForm.valid && this.selectedBookId !== null) {
//     const reservationData = this.reservationForm.value;
//     const requestData = {
//       user_id: reservationData.id,
//       book_id: this.selectedBookId,
//       start_date: reservationData.dateRequest,
//       end_date: reservationData.dateOfExpiration,
//       fine: reservationData.fines,
//       status: true // Assuming always true for new reservations
//     };

//     this.http.post<any>('http://localhost:8000/api/reservations', requestData)
//       .subscribe(response => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Reservation created successfully',
//         });
//         this.reservationForm.reset();
//       }, error => {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to create reservation',
//         });
//       });
//   } else {
//     console.error('Form is invalid or no book selected');
//   }
// }

  logFormState(): void {
    Object.keys(this.reservationForm.controls).forEach(key => {
      const controlErrors = this.reservationForm.get(key)?.errors;
      if (controlErrors != null) {
        console.log('Key control: ' + key + ', errors: ' + JSON.stringify(controlErrors));
      }
    });
  }
}
