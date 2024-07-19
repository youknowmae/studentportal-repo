import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../api-service.service';
import { AuthenticationService } from '../../../../authentication-service.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  selectedAccession: string | null = null;
  termsAccepted: boolean = false; // Added to track checkbox status

  constructor(
    private dialogRef: MatDialogRef<ReservemodalComponent>, // Inject MatDialogRef
    private fb: FormBuilder,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private http: HttpClient,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedAccession = data.accession;
    this.selectedAccession = data.accession;
    this.reservationForm = this.fb.group({
      fullName: ['', Validators.required],
      user_id: ['', Validators.required],
      department: ['', Validators.required],
      title: ['', Validators.required],
      authors: ['', Validators.required],
      fine: ['500', [Validators.required, Validators.min(0)]],
      reserve_date: ['', Validators.required],
      status: [2, Validators.required],
      type: [0, Validators.required],
      termsAccepted: [false, Validators.requiredTrue] // Ensure terms are accepted
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
    if (this.selectedAccession !== null) {
      this.fetchBookData(this.selectedAccession);
    }
  }

  fetchUserData(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        const userInfo = {
          fullName: `${user.first_name} ${user.last_name}`,
          user_id: user.id, // Ensure it matches the form control name
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
      user_id: userInfo.user_id, // Ensure it matches the form control name
      department: userInfo.department,
    });
  }

  fillBookInfo(selectedBook: any): void {
    this.reservationForm.patchValue({
      title: selectedBook.title,
      authors: selectedBook.authors,
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid && this.selectedAccession !== null) {
      const reservationData = this.reservationForm.value;
      const requestData = {
        user_id: reservationData.user_id,
        book_id: this.selectedAccession,
        reserve_date: reservationData.reserve_date,
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
          }).then(() => {
            this.dialogRef.close(); // Close the modal after success message
          });
          this.reservationForm.reset();
        },
        error => {
          let errorMessage = 'Failed to create reservation';
          
          if (error.error && error.error.error) {
            errorMessage = error.error.error; // Use the error message from the backend
          } else if (error.message) {
            errorMessage = error.message; // Fallback to the error message from HttpErrorResponse
          }
          
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
          });
          console.error('Error creating reservation:', error);
        }
      );
    } else {
      this.logFormState();
      console.error('Form is invalid or no book selected');
    }
  }

  // Added method to toggle termsAccepted
  onTermsChange(event: any): void {
    this.termsAccepted = event.target.checked;
    this.reservationForm.patchValue({ termsAccepted: this.termsAccepted });
  }

  logFormState(): void {
    Object.keys(this.reservationForm.controls).forEach(key => {
      const controlErrors = this.reservationForm.get(key)?.errors;
      if (controlErrors != null) {
        console.log('Key control: ' + key + ', errors: ' + JSON.stringify(controlErrors));
      }
    });
  }

  openterm(): void {
    this.dialog.open(TermsmodalComponent, {});
  }
}
