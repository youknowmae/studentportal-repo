import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service';

@Component({
  selector: 'app-periodicals',
  templateUrl: './periodicals.component.html',
  styleUrls: ['./periodicals.component.scss']
})
export class PeriodicalsComponent implements OnInit {
  periodicals: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchPeriodicals();
  }

  fetchPeriodicals(type: string = ''): void {
    if (type) {
      this.apiService.getPeriodicalsByMaterialType(type).subscribe(
        (data: any[]) => {
          this.periodicals = data;
        },
        (error) => {
          console.error('Error fetching periodicals:', error);
        }
      );
    } else {
      this.apiService.getPeriodicals().subscribe(
        (data: any[]) => {
          this.periodicals = data;
        },
        (error) => {
          console.error('Error fetching periodicals:', error);
        }
      );
    }
  }

  onMaterialTypeChange(event: Event): void {
    const type = (event.target as HTMLSelectElement)?.value || '';
    this.fetchPeriodicals(type);
  }
}
