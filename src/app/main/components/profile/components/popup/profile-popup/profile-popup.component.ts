import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-popup',
  templateUrl: './profile-popup.component.html',
  styleUrl: './profile-popup.component.scss'
})
export class ProfilePopupComponent {
// Component logic here
constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<ProfilePopupComponent>) {

}
closepopup() {
  this.ref.close('Closed using function');
}
}

