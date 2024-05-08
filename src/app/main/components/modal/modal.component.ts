import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isVisible: boolean = false;
  @Input() selectedProject: any;

  closeModal(): void {
    this.isVisible = false;
}
}
