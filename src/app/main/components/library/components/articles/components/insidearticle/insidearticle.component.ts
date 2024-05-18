import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../../../api-service.service';

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
      const articleId = +params['id'];
      this.fetchArticle(articleId);
    });
  }

  fetchArticle(id: number): void {
    this.apiService.getArticleById(id).subscribe(
      (data: any) => {
        this.article = data;
      },
      (error) => {
        console.error('Error fetching article:', error);
      }
    );
  }
}
