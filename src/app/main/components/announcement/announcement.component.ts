import { Component } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.scss'
})
export class AnnouncementComponent {
  expanded: boolean = false;

  toggleExpansion() {
    this.expanded = !this.expanded;
  }
}