import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementRoutingModule } from './announcement-routing.module';
import { InsideannouncementComponent } from '../inside/insideannouncement/insideannouncement.component';

@NgModule({
  declarations: [
    InsideannouncementComponent,
  ],
  imports: [
    CommonModule,
    AnnouncementRoutingModule
  ]
})
export class AnnouncementModule { }
