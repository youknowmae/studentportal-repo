import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsidearticleComponent } from '../../../inside/insidearticle/insidearticle.component';

const routes: Routes = [
  { path: '', redirectTo: 'journals', pathMatch: 'full' },
  { path: 'insidearticle/:accession', component: InsidearticleComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
