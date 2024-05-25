import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../../../api-service.service';

@Component({
  selector: 'app-insideacademic',
  templateUrl: './insideacademic.component.html',
  styleUrls: ['./insideacademic.component.scss']
})
export class InsideacademicComponent implements OnInit {
  project: any; // Change 'projects' to 'project'

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.fetchProject(id);
    });
  }

  fetchProject(id: number): void {
    this.apiService.getProjectById(id).subscribe(
      (data: any) => {
        console.log('Fetched project data:', data);
        this.project = data; // Change 'projects' to 'project'
      },
      (error) => {
        console.error('Error fetching project:', error);
      }
    );
  }
}