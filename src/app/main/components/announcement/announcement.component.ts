import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api-service.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  announcements: any[] = [];
  loading: boolean = true; // Add loading flag and initialize as true

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchAnnouncements();
  }

  fetchAnnouncements() {
    this.apiService.getAnnouncements().subscribe(
      (announcements: any[]) => {
        this.announcements = announcements;
        this.loading = false; // Set loading to false when data is fetched
      },
      error => {
        console.error('Error fetching announcements:', error);
        // Handle error
      }
    );
  }
}
