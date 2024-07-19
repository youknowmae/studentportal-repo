import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-audio-visual',
  templateUrl: './audiovisuals.component.html',
  styleUrls: ['./audiovisuals.component.scss']
})
export class AudiovisualsComponent implements OnInit {
  audioVisuals: any[] = [];
  searchQuery: string = '';
  loading: boolean = false;

  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.fetchAudioVisuals();
  }

  fetchAudioVisuals(): void {
    this.loading = true;
    this.ApiService.getAudioVisuals().subscribe(
      data => {
        this.audioVisuals = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch audio-visual materials',
        });
      }
    );
  }

  searchAudioVisuals(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.ApiService.searchAudioVisuals(this.searchQuery).subscribe(
        data => {
          this.audioVisuals = data;
          this.loading = false;
        },
      );
    }
  }
}