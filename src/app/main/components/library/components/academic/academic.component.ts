import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service';
import { AuthenticationService } from '../../../../../authentication-service.service';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.scss']
})
export class AcademicComponent implements OnInit {
  isVisible: boolean = false;
  selectedProject: any;
  departmentProjects: any[] = [];
  projectCategories: string[] = ['CBAR', 'THESIS', 'CAPSTONE', 'RESEARCH', 'FEASIBILITY STUDY', 'DISSERTATION']; // Define project categories
  visibleButtons: { [key: string]: boolean } = {}; // Object to track visibility of buttons
  selectedCategory: string | null = null; // Initialize selected category
  projects: any[] = []; // Initialize projects array

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    // Fetch the department value from the AuthenticationService
    const department = this.authService.getDepartment();
    // If department exists, fetch projects for that department
    if (department) {
      this.fetchProjects(department);
    } else {
      console.error('Department not found in localStorage');
    }
    console.log('Initialized with projects:', this.projects);
  }

  // Fetch projects based on department
  fetchProjects(department: string): void {
    this.apiService.getProjectsByDepartment(department).subscribe(
      (data) => {
        console.log('Projects Data:', data); // Log the projects data
  
        // Reset visibility flags
        this.visibleButtons = {
          CBAR: false,
          THESIS: false,
          CAPSTONE: false,
          RESEARCH: false,
          DISSERTATION: false,
          'FEASIBILITY STUDY': false
        };
  
        // Assign data to departmentProjects
        this.departmentProjects = data;
  
        // Iterate through projects and update visibility flags
        data.forEach(project => {
          const category = project.category.toUpperCase();
          if (this.visibleButtons.hasOwnProperty(category)) {
            this.visibleButtons[category] = true;
          }
        });
        console.log('Visible Buttons:', this.visibleButtons); // Log the visibility flags
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  // Handle dropdown selection
  handleDropdownChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const category = selectElement.value;

    if (category) {
      this.selectedCategory = category;

      // Trim and convert category to uppercase for comparison
      const formattedCategory = category.trim().toUpperCase();

      // Find the projects for the selected category
      const selectedCategoryData = this.departmentProjects.find(projectData => projectData.category.trim().toUpperCase() === formattedCategory);

      if (selectedCategoryData) {
        const selectedProjects = selectedCategoryData.projects;

        // Update the projects array with the selected projects
        this.projects = selectedProjects;
        console.log('Selected Projects:', this.projects);
      } else {
        console.error('No projects found for category:', category);
      }
    }
  }

  // Method to open the modal and pass the selected project data
  openProjectModal(project: any): void {
    this.selectedProject = project;
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }
}