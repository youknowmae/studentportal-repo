import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ThesisComponent } from './components/thesis/thesis.component';
import { CapstoneComponent } from './components/capstone/capstone.component';
import { AllComponent } from './components/all/all.component';
import { InsidedashboardComponent } from './components/insidedashboard/insidedashboard.component';


@NgModule({
  declarations: [
    ThesisComponent,
    CapstoneComponent,
    AllComponent,
    InsidedashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
