import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfilemodalComponent } from '../modal/profilemodal/profilemodal.component';
import { QrmodalComponent } from '../modal/qrmodal/qrmodal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    private dialogRef: MatDialog, 
    private authService: AuthenticationService
  ) { }


  ngOnInit(): void {
    // Subscribe to user$ observable from AuthenticationService
    this.authService.user$.subscribe((user: any) => {
      this.user = user;
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
}
