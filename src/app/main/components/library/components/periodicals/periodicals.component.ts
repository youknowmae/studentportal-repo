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

  fetchPeriodicals(materialType: string = ''): void {
    if (materialType) {
      this.apiService.getPeriodicalsByMaterialType(materialType).subscribe(
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
    const materialType = (event.target as HTMLSelectElement)?.value || '';
    this.fetchPeriodicals(materialType);
  }
}
