import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api-service.service';

@Component({
  selector: 'app-insideperiodical',
  templateUrl: './insideperiodical.component.html',
  styleUrls: ['./insideperiodical.component.scss']
})
export class InsideperiodicalComponent implements OnInit {
  materials: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const accession = params['id'];
      this.fetchPeriodical(accession);
    });
  }

  fetchPeriodical(accession: string): void {
    this.apiService.getPeriodicalById(accession).subscribe(
      (data: any) => {
        this.materials = data;
      },
      (error) => {
        console.error('Error fetching periodical:', error);
      }
    );
  }
}