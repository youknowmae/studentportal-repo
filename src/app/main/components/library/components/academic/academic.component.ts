import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service';
import { AuthenticationService } from '../../../../../authentication-service.service';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrl: './academic.component.scss'
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
  fetchProjects(type: string): void {
    this.apiService.getProjectsByDepartment(type).subscribe(
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

        // Set the default category to the first available category
        const defaultCategory = this.projectCategories.find(category => this.visibleButtons[category]);
        if (defaultCategory) {
          this.selectedCategory = defaultCategory;
          // Fetch projects for the default category
          this.fetchProjectsByCategory(defaultCategory);
        } else {
          console.warn('No projects available for the department.');
          // You can handle this case as per your application's logic
        }
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  // Fetch projects by category
  fetchProjectsByCategory(category: string): void {
    const selectedCategoryData = this.departmentProjects.find(projectData => projectData.category.trim().toUpperCase() === category);
    if (selectedCategoryData) {
      const selectedProjects = selectedCategoryData.projects;
      this.projects = selectedProjects;
      console.log('Selected Projects:', this.projects);
    } else {
      console.error('No projects found for category:', category);
    }
  }

  // Handle dropdown selection
  handleDropdownChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const category = selectElement.value;

    if (category) {
      this.selectedCategory = category;

      // Fetch projects for the selected category
      this.fetchProjectsByCategory(category);
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
