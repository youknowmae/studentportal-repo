import { Component } from '@angular/core';
@Component({
  selector: 'app-qrmodal',
  templateUrl: './qrmodal.component.html',
  styleUrls: ['./qrmodal.component.scss']
})
export class QrmodalComponent {
  showModal = true;


  closeModal(): void {
    this.showModal = false;
  }
}
