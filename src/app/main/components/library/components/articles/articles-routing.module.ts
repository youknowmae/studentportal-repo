import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalsComponent } from './components/journals/journals.component';
import { NewspapersComponent } from './components/newspapers/newspapers.component';
import { MagazinesComponent } from './components/magazines/magazines.component';
import { InsidearticleComponent } from '../../../inside/insidearticle/insidearticle.component';

const routes: Routes = [
  { path: '', redirectTo: 'journals', pathMatch: 'full' },
  { path: 'journals', component: JournalsComponent },
  { path: 'newspapers', component: NewspapersComponent },
  { path: 'magazines', component: MagazinesComponent },
  { path: 'insidearticle/:accession', component: InsidearticleComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
