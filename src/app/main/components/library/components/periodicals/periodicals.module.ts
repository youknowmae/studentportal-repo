import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodicalsRoutingModule } from './periodicals-routing.module';
import { JournalsComponent } from './components/journals/journals.component';
import { NewspapersComponent } from './components/newspapers/newspapers.component';
import { MagazinesComponent } from './components/magazines/magazines.component';
import { InsideperiodicalComponent } from '../../../inside/insideperiodical/insideperiodical.component';
<<<<<<< HEAD

=======
>>>>>>> 8de00df0ce5d1afafaec4b948f9d912c7b2d2b25

@NgModule({
  declarations: [
    JournalsComponent,
    NewspapersComponent,
    MagazinesComponent,
<<<<<<< HEAD
    InsideperiodicalComponent,
=======
    InsideperiodicalComponent
>>>>>>> 8de00df0ce5d1afafaec4b948f9d912c7b2d2b25
  ],
  imports: [
    CommonModule,
    PeriodicalsRoutingModule
  ]
})
export class PeriodicalsModule { }
