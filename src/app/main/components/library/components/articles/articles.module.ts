import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { InsidearticleComponent } from '../../../inside/insidearticle/insidearticle.component';

@NgModule({
  declarations: [
    InsidearticleComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
