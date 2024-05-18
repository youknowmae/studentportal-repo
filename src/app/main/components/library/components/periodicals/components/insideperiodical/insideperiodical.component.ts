import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../../../api-service.service';

@Component({
  selector: 'app-insideperiodical',
  templateUrl: './insideperiodical.component.html',
  styleUrls: ['./insideperiodical.component.scss']
})
export class InsideperiodicalComponent implements OnInit {
  periodicals: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const periodicalId = +params['id'];
      this.fetchPeriodical(periodicalId);
    });
  }

  fetchPeriodical(id: number): void {
    this.apiService.getPeriodicalById(id).subscribe(
      (data: any) => {
        this.periodicals = data;
      },
      (error) => {
        console.error('Error fetching periodical:', error);
      }
    );
  }
}