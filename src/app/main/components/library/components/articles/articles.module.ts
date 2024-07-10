import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { JournalsComponent } from './components/journals/journals.component';
import { NewspapersComponent } from './components/newspapers/newspapers.component';
import { MagazinesComponent } from './components/magazines/magazines.component';
import { InsidearticleComponent } from '../../../inside/insidearticle/insidearticle.component';
<<<<<<< HEAD

=======
>>>>>>> 8de00df0ce5d1afafaec4b948f9d912c7b2d2b25

@NgModule({
  declarations: [
    JournalsComponent,
    NewspapersComponent,
    MagazinesComponent,
<<<<<<< HEAD
    InsidearticleComponent,
=======
    InsidearticleComponent
>>>>>>> 8de00df0ce5d1afafaec4b948f9d912c7b2d2b25
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
