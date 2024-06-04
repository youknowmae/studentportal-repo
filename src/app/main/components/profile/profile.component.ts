import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfilemodalComponent } from '../modal/profilemodal/profilemodal.component';
import { QrmodalComponent } from '../modal/qrmodal/qrmodal.component';
import { ApiService } from '../../../api-service.service';
import { response } from 'express';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  selectedSection: string = 'borrowed';

  constructor(
    private dialogRef: MatDialog, 
    private authService: AuthenticationService,
    private apiService: ApiService
  ) { }


  ngOnInit(): void {
    // Subscribe to user$ observable from AuthenticationService
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
      this.fetchBooks();
    });
  }

  onAddNewBtnClick() {
    this.dialogRef.open(ProfileComponent, {});
  }

  openmodal () {
    this.dialogRef.open(ProfilemodalComponent, {})
  }

  openqrmodal (){
    this.dialogRef.open(QrmodalComponent, {})
  }

  books: any[] = [];
  

  fetchBooks(): void {
    this.apiService.getBooks()  // Call getBooks() from ApiService
      .subscribe(data => {
        this.books = data;
        console.log(this.books)
      });
  }

  setActiveSection(section: string): void {
    this.selectedSection = section;
  }
}
