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
  projectCategories: string[] = ['CBAR', 'THESIS', 'CAPSTONE', 'RESEARCH', 'FEASIBILITY STUDY', 'DISSERTATION'];
  visibleButtons: { [key: string]: boolean } = {};
  selectedCategory: string | null = null;
  projects: any[] = [];
  searchQuery: string = '';
  filteredProjects: any[] = [];
  loading: boolean = false; // Loading indicator
  currentPage: number = 1; // Current page for pagination
  projectsPerPage: number = 6; // Number of projects per page

  constructor(
    private apiService: ApiService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    const department = this.authService.getDepartment();
    if (department) {
      this.fetchProjects(department);
    } else {
      console.error('Department not found in localStorage');
    }
    console.log('Initialized with projects:', this.projects);
  }

  fetchProjects(type: string): void {
    this.loading = true; // Set loading to true before making API call
    
    this.apiService.getProjectsByDepartment(type).subscribe(
      (data) => {
        this.departmentProjects = data;
        this.updateVisibleButtons();
        this.setDefaultCategory();
        this.loading = false; // Set loading to false after data is fetched
      },
      (error) => {
        console.error('Error fetching projects:', error);
        this.loading = false; // Set loading to false in case of error
      }
    );
  }

  updateVisibleButtons(): void {
    this.visibleButtons = {
      CBAR: false,
      THESIS: false,
      CAPSTONE: false,
      RESEARCH: false,
      DISSERTATION: false,
      'FEASIBILITY STUDY': false
    };
    this.departmentProjects.forEach(project => {
      const category = project.category.toUpperCase();
      if (this.visibleButtons.hasOwnProperty(category)) {
        this.visibleButtons[category] = true;
      }
    });
    console.log('Visible Buttons:', this.visibleButtons);
  }

  setDefaultCategory(): void {
    const defaultCategory = this.projectCategories.find(category => this.visibleButtons[category]);
    if (defaultCategory) {
      this.selectedCategory = defaultCategory;
      this.fetchProjectsByCategory(defaultCategory);
    } else {
      console.warn('No projects available for the department.');
    }
  }

  fetchProjectsByCategory(category: string): void {
    const selectedCategoryData = this.departmentProjects.find(projectData => projectData.category.trim().toUpperCase() === category);
    if (selectedCategoryData) {
      this.projects = selectedCategoryData.projects;
      this.filterProjects();
      console.log('Selected Projects:', this.projects);
    } else {
      console.error('No projects found for category:', category);
    }
  }

  handleDropdownChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const category = selectElement.value;

    if (category) {
      this.selectedCategory = category;
      this.fetchProjectsByCategory(category);
    }
  }

  openProjectModal(project: any): void {
    this.selectedProject = project;
    this.isVisible = true;
  }

  closeModal(): void {
    this.isVisible = false;
  }

  filterProjects(): void {
    if (!this.searchQuery) {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.authors.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  // Pagination methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterProjects(); // Reapply filtering for the new page
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.filterProjects(); // Reapply filtering for the new page
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterProjects(); // Reapply filtering for the new page
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProjects.length / this.projectsPerPage);
  }

  get paginatedProjects(): any[] {
    const startIndex = (this.currentPage - 1) * this.projectsPerPage;
    const endIndex = startIndex + this.projectsPerPage;
    return this.filteredProjects.slice(startIndex, endIndex);
  }

  get visiblePages(): number[] {
    // Calculate the range of visible page numbers
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(start + 4, this.totalPages);

    // Generate array of visible page numbers for pagination buttons
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
