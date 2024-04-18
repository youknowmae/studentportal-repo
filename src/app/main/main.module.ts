import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { LibraryComponent } from './components/library/library.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LibraryModule } from './components/library/library.module';


@NgModule({
  declarations: [
    AnnouncementComponent,
    LibraryComponent,
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    LibraryModule
  ]
})
export class MainModule { }
