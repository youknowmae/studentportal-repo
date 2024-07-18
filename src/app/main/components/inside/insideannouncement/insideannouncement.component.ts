import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api-service.service';

@Component({
  selector: 'app-insideannouncement',
  templateUrl: './insideannouncement.component.html',
  styleUrls: ['./insideannouncement.component.scss']
})
export class InsideannouncementComponent implements OnInit {
  announcement: any;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getAnnouncement();
  }

  getAnnouncement() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    // Using the non-null assertion operator (!) to assert that paramMap and get('id') are not null
    this.apiService.getAnnouncementById(id).subscribe(
      (announcement: any) => {
        this.announcement = announcement;
        this.loading = false;
      },
      error => {
        console.error('Error fetching announcement:', error);
        // Handle error
      }
    );
  }
}
