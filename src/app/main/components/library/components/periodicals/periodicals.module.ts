import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodicalsRoutingModule } from './periodicals-routing.module';
import { JournalsComponent } from './components/journals/journals.component';
import { NewspapersComponent } from './components/newspapers/newspapers.component';
import { MagazinesComponent } from './components/magazines/magazines.component';
import { InsideperiodicalComponent } from '../../../inside/insideperiodical/insideperiodical.component';

@NgModule({
  declarations: [
    JournalsComponent,
    NewspapersComponent,
    MagazinesComponent,
    InsideperiodicalComponent,
  ],
  imports: [
    CommonModule,
    PeriodicalsRoutingModule
  ]
})
export class PeriodicalsModule { }
