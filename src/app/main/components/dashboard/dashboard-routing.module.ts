import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThesisComponent } from './components/thesis/thesis.component';
import { CapstoneComponent } from './components/capstone/capstone.component';

const routes: Routes = [
  { path: '', redirectTo: 'thesis', pathMatch: 'full' },
  { path: 'thesis', component: ThesisComponent },
  { path: 'capstone', component: CapstoneComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
