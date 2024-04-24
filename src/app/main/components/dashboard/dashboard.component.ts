import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api-service.service';
import { AuthenticationService } from '../../../authentication-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  apiUrl: string = "http://localhost:8000/api";
  projects: any[] = [];
  filteredProjects: any[] = [];
  department: string | null = null;

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user && user.department) {
        this.department = user.department;
        this.fetchProjects();
      }
    });
  }

  fetchProjects(): void {
    this.apiService.getProjects()
      .subscribe(data => {
        this.projects = data;
        this.filterProjectsByDepartment();
      });
  }

  filterProjectsByDepartment(): void {
    if (this.department) {
      this.filteredProjects = this.projects.filter(project => project.department === this.department);
    } else {
      this.filteredProjects = [...this.projects];
    }
  }
}