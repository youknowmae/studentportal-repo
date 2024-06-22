import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../api-service.service';
import { AuthenticationService } from '../../../../authentication-service.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TermsmodalComponent } from '../termsmodal/termsmodal.component';

@Component({
  selector: 'app-reservemodal',
  templateUrl: './reservemodal.component.html',
  styleUrls: ['./reservemodal.component.scss']
})
export class ReservemodalComponent implements OnInit {
  reservationForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  selectedBookId: string | null = null;
  termsAccepted: boolean = false; // Added to track checkbox status

  constructor(
    private dialogRef: MatDialog, 
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private http: HttpClient,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedBookId = data.bookId;
    this.reservationForm = this.fb.group({
      fullName: ['', Validators.required],
      id: ['', Validators.required],
      department: ['', Validators.required],
      title: ['', Validators.required],
      authors: ['', Validators.required],
      numberOfBooks: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      status: [1, Validators.required],
      type: ['online', Validators.required],
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
        };
        this.fillUserInfo(userInfo);
      } else {
        console.error('No user data found');
      }
    });
  }

  fetchBookData(accession: string): void {
    const authToken = this.authService.getToken();
    if (!authToken) {
      console.error('Authentication token is missing. Please log in again.');
      return;
    }

    this.apiService.getBookById(accession, { 'Authorization': `Bearer ${authToken}` }).subscribe(data => {
      if (data) {
        const selectedBook = {
          title: data.title,
          authors: data.authors,
          price: data.price,
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
    });
  }

  fillBookInfo(selectedBook: any): void {
    this.reservationForm.patchValue({
      title: selectedBook.title,
      authors: selectedBook.authors,
      price: selectedBook.price,
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
        price: reservationData.price,
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

  // Added method to toggle termsAccepted
  onTermsChange(event: any): void {
    this.termsAccepted = event.target.checked;
  }

  logFormState(): void {
    Object.keys(this.reservationForm.controls).forEach(key => {
      const controlErrors = this.reservationForm.get(key)?.errors;
      if (controlErrors != null) {
        console.log('Key control: ' + key + ', errors: ' + JSON.stringify(controlErrors));
      }
    });
  }

  openterm () {
    this.dialogRef.open(TermsmodalComponent, {})
  }
}
