import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { JournalsComponent } from './components/journals/journals.component';
import { NewspapersComponent } from './components/newspapers/newspapers.component';
import { MagazinesComponent } from './components/magazines/magazines.component';
import { InsidearticleComponent } from '../../../inside/insidearticle/insidearticle.component';


@NgModule({
  declarations: [
    JournalsComponent,
    NewspapersComponent,
    MagazinesComponent,
    InsidearticleComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
