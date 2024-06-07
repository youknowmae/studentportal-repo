import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../api-service.service';

@Component({
  selector: 'app-insidearticle',
  templateUrl: './insidearticle.component.html',
  styleUrls: ['./insidearticle.component.scss']
})
export class InsidearticleComponent implements OnInit {
  article: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('Route Params:', params);
      const accession = params['accession'];
      console.log('Accession:', accession);
      this.fetchArticle(accession);
    });
  }

  fetchArticle(accession: string): void {
    this.apiService.getArticleById(accession).subscribe(
      (data: any) => {
        this.article = data;
      },
      (error) => {
        console.error('Error fetching article:', error);
      }
    );
  }
}
