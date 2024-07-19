import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodicalsRoutingModule } from './periodicals-routing.module';
import { InsideperiodicalComponent } from '../../../inside/insideperiodical/insideperiodical.component';

@NgModule({
  declarations: [
    InsideperiodicalComponent,
  ],
  imports: [
    CommonModule,
    PeriodicalsRoutingModule
  ]
})
export class PeriodicalsModule { }
