import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { LibraryComponent } from './components/library/library.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LibraryModule } from './components/library/library.module';
import { ProfileModule } from './components/profile/profile.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    AnnouncementComponent,
    LibraryComponent,
    ProfileComponent,
    DashboardComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    LibraryModule,
    ProfileModule,
    DashboardModule
  ]
})
export class MainModule { }
