import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsideacademicComponent } from '../../../inside/insideacademic/insideacademic.component';

const routes: Routes = [
  { path: 'insideacademic/:accession', component: InsideacademicComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicRoutingModule { }
