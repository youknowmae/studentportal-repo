import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../api-service.service';

@Component({
  selector: 'app-periodicals',
  templateUrl: './periodicals.component.html',
  styleUrls: ['./periodicals.component.scss']
})
export class PeriodicalsComponent implements OnInit {
  periodicals: any[] = [];
  paginatedPeriodicals: any[] = [];
  currentPage: number = 1;
  periodicalsPerPage: number = 9;
  loading: boolean = true;
  selectedMaterialTypeLabel: string = 'Select Material Type';
  searchQuery: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchPeriodicals();
  }

  fetchPeriodicals(type: string = ''): void {
    this.loading = true;

    if (this.searchQuery) {
      this.apiService.searchPeriodicals(this.searchQuery).subscribe(
        (data: any[]) => {
          this.periodicals = data;
          this.updatePaginatedPeriodicals();
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching periodicals by search query:', error);
          this.loading = false;
        }
      );
    } else if (type) {
      this.apiService.getPeriodicalsByMaterialType(type).subscribe(
        (data: any[]) => {
          this.periodicals = data;
          this.updatePaginatedPeriodicals();
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching periodicals:', error);
          this.loading = false;
        }
      );
    } else {
      this.apiService.getPeriodicals().subscribe(
        (data: any[]) => {
          this.periodicals = data;
          this.updatePaginatedPeriodicals();
          this.loading = false;
        },
        (error) => {
          console.error('Error fetching periodicals:', error);
          this.loading = false;
        }
      );
    }
  }

  updatePaginatedPeriodicals(): void {
    const startIndex = (this.currentPage - 1) * this.periodicalsPerPage;
    const endIndex = startIndex + this.periodicalsPerPage;
    this.paginatedPeriodicals = this.periodicals.slice(startIndex, endIndex);
  }

  onMaterialTypeChange(event: Event, type: string): void {
    event.preventDefault();
    this.currentPage = 1;
    this.fetchPeriodicals(type);
    this.updateMaterialTypeLabel(type);
  }

  updateMaterialTypeLabel(type: string): void {
    switch (type) {
      case 'journal':
        this.selectedMaterialTypeLabel = 'Journal';
        break;
      case 'magazine':
        this.selectedMaterialTypeLabel = 'Magazine';
        break;
      case 'newspaper':
        this.selectedMaterialTypeLabel = 'Newspaper';
        break;
      default:
        this.selectedMaterialTypeLabel = 'All';
        break;
    }
  }

  onSearchChange(event: Event): void {
    this.currentPage = 1;
    this.fetchPeriodicals();
  }

  get totalPages(): number {
    return Math.ceil(this.periodicals.length / this.periodicalsPerPage);
  }

  getPaginationSummary(): string {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    return `${currentPage} of ${totalPages}`;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedPeriodicals();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPeriodicals();
    }
  }
}
