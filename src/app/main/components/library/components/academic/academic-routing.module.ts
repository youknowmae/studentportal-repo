import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicComponent } from './academic.component';
import { InsideacademicComponent } from '../../../inside/insideacademic/insideacademic.component';

const routes: Routes = [
  { path: '', component: AcademicComponent },
  { path: 'insideacademic/:id', component: InsideacademicComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicRoutingModule { }
