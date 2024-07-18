import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api-service.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
  announcements: any[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchAnnouncements();
  }

  fetchAnnouncements() {
    this.apiService.getAnnouncements().subscribe(
      (announcements: any[]) => {
        this.announcements = announcements;
        this.loading = false;
      },
      error => {
        console.error('Error fetching announcements:', error);
        // Handle error
      }
    );
  }
}
