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
  loading: boolean = false;
  currentPage: number = 1;
  projectsPerPage: number = 6;
  isDropdownOpen: boolean = false;

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

  // Fetch projects by department
  fetchProjects(type: string): void {
    this.loading = true; // Set loading to true before making API call
    
    this.apiService.getProjectsByDepartment(type).subscribe(
      (data) => {
        this.departmentProjects = data;
        this.updateVisibleButtons();
        this.setDefaultCategory();
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching projects:', error);
        this.loading = false;
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

  // Set default category based on available projects
  setDefaultCategory(): void {
    const defaultCategory = this.projectCategories.find(category => this.visibleButtons[category]);
    if (defaultCategory) {
      this.selectedCategory = defaultCategory;
      this.fetchProjectsByCategory(defaultCategory);
    } else {
      console.warn('No projects available for the department.');
    }
  }

  // Fetch projects by selected category
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

  // Handle dropdown change event
  handleDropdownChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const category = selectElement.value;

    if (category) {
      this.selectedCategory = category;
      this.fetchProjectsByCategory(category);
    }
  }

  // Toggle dropdown open/close state
  toggleDropdown(open: boolean): void {
    this.isDropdownOpen = open;
  }

  // Open project modal
  openProjectModal(project: any): void {
    this.selectedProject = project;
    this.isVisible = true;
  }

  // Close modal
  closeModal(): void {
    this.isVisible = false;
  }

  // Filter projects based on search query
  filterProjects(): void {
    if (!this.searchQuery) {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        project.authors.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    this.currentPage = 1; // Reset to first page after filtering
  }

  // Pagination methods
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Calculate total pages for pagination
  get totalPages(): number {
    return Math.ceil(this.filteredProjects.length / this.projectsPerPage);
  }

  // Get paginated projects based on current page
  get paginatedProjects(): any[] {
    const startIndex = (this.currentPage - 1) * this.projectsPerPage;
    const endIndex = startIndex + this.projectsPerPage;
    return this.filteredProjects.slice(startIndex, endIndex);
  }

  // Get visible page numbers for pagination
  get visiblePages(): number[] {
    const totalVisiblePages = 5; // Number of visible pages around the current page
    const start = Math.max(1, this.currentPage - Math.floor(totalVisiblePages / 2));
    const end = Math.min(this.totalPages, start + totalVisiblePages - 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  // Set number of projects per page
  setProjectsPerPage(count: number): void {
    this.projectsPerPage = count;
    this.currentPage = 1; // Reset to first page
  }

  getPaginationSummary(): string {
    const startItem = (this.currentPage - 1) * this.projectsPerPage + 1;
    const endItem = Math.min(this.currentPage * this.projectsPerPage, this.filteredProjects.length);
    const totalItems = this.filteredProjects.length;
    return ` ${startItem} of ${totalItems}`;
  }
}
