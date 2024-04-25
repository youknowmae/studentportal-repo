import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ThesisComponent } from './components/thesis/thesis.component';
import { CapstoneComponent } from './components/capstone/capstone.component';


@NgModule({
  declarations: [
    ThesisComponent,
    CapstoneComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
