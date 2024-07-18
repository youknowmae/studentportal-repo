import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api-service.service';

@Component({
  selector: 'app-insideacademic',
  templateUrl: './insideacademic.component.html',
  styleUrls: ['./insideacademic.component.scss']
})
export class InsideacademicComponent implements OnInit {
  project: any; // Define 'project' to hold the fetched project data

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const accession = params['accession']; // Accession should be string type
      this.fetchProject(accession);
    });
  }

  fetchProject(accession: string): void {
    this.apiService.getProjectById(accession).subscribe(
      (data: any) => {
        console.log('Fetched project data:', data);
        this.project = data; // Assign fetched project data to 'project'
      },
      (error) => {
        console.error('Error fetching project:', error);
      }
    );
  }
}