import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-logoutmodal',
  templateUrl: './logoutmodal.component.html',
  styleUrl: './logoutmodal.component.scss'
})
export class LogoutmodalComponent {
  @Input() isVisible: boolean = false;
  @Input() selectedProject: any;

  closeModal(): void {
    this.isVisible = false;
}
}
