import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { LibraryComponent } from './components/library/library.component';
import { HistoryComponent } from './components/history/history.component';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReservationformComponent } from './components/library/reservationform/reservationform.component';


@NgModule({
  declarations: [
    AnnouncementComponent,
    LibraryComponent,
    HistoryComponent,
    // DashboardComponent,
    ProfileComponent,
    ReservationformComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
