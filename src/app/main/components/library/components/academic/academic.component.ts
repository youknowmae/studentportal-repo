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
  }

  fetchProjects(department: string): void {
    this.loading = true;
    this.apiService.getProjectsByDepartment(department).subscribe(
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
    this.loading = true;
    this.apiService.getProjectsByCategory(category).subscribe(
      (data) => {
        this.projects = data;
        this.filterProjects();
        console.log('Selected Projects:', this.projects);
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching projects by category:', error);
        this.loading = false;
      }
    );
  }

  handleDropdownChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const category = selectElement.value;

    if (category) {
      this.selectedCategory = category;
      this.fetchProjectsByCategory(category);
    }
  }

  toggleDropdown(open: boolean): void {
    this.isDropdownOpen = open;
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
        (project.authors && project.authors.some((author: string) => author.toLowerCase().includes(this.searchQuery.toLowerCase())))
      );
    }
    this.currentPage = 1;
  }

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

  get totalPages(): number {
    return Math.ceil((this.filteredProjects ? this.filteredProjects.length : 0) / this.projectsPerPage);
  }

  get paginatedProjects(): any[] {
    const startIndex = (this.currentPage - 1) * this.projectsPerPage;
    const endIndex = startIndex + this.projectsPerPage;

    if (this.filteredProjects && this.filteredProjects.length > 0) {
      return this.filteredProjects.slice(startIndex, endIndex);
    } else {
      return [];
    }
  }

  get visiblePages(): number[] {
    const totalVisiblePages = 5;
    const start = Math.max(1, this.currentPage - Math.floor(totalVisiblePages / 2));
    const end = Math.min(this.totalPages, start + totalVisiblePages - 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  setProjectsPerPage(count: number): void {
    this.projectsPerPage = count;
    this.currentPage = 1;
  }

  getPaginationSummary(): string {
    const startItem = (this.currentPage - 1) * this.projectsPerPage + 1;
    const endItem = Math.min(this.currentPage * this.projectsPerPage, (this.filteredProjects ? this.filteredProjects.length : 0));
    const totalItems = this.filteredProjects ? this.filteredProjects.length : 0;
    return `${startItem} of ${totalItems}`;
  }
}