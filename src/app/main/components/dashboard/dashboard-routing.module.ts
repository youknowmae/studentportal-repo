import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThesisComponent } from './components/thesis/thesis.component';
import { CapstoneComponent } from './components/capstone/capstone.component';
import { AllComponent } from './components/all/all.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: AllComponent },
  { path: 'thesis', component: ThesisComponent },
  { path: 'capstone', component: CapstoneComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
