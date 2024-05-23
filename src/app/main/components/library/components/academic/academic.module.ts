import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicRoutingModule } from './academic-routing.module';
import { InsideacademicComponent } from '../../../inside/insideacademic/insideacademic.component';
import { AcademicComponent } from './academic.component';

@NgModule({
  declarations: [
    InsideacademicComponent,
  ],
  imports: [
    CommonModule,
    AcademicRoutingModule,
    AcademicComponent
  ]
})
export class AcademicModule { }
