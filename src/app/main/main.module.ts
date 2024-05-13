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
import { BooksModule } from './components/library/components/books/books.module';
import { ProfilemodalComponent } from './components/modal/profilemodal/profilemodal.component';
import { LogoutmodalComponent } from './components/modal/logoutmodal/logoutmodal.component';
import { ReservemodalComponent } from './components/modal/reservemodal/reservemodal.component';
import { QrmodalComponent } from './components/modal/qrmodal/qrmodal.component';



@NgModule({
  declarations: [
    AnnouncementComponent,
    LibraryComponent,
    ProfileComponent,
    DashboardComponent,
    ProfilemodalComponent,
    LogoutmodalComponent,
    ReservemodalComponent,
    QrmodalComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    LibraryModule,
    ProfileModule,
    DashboardModule,
    BooksModule
  ]
})
export class MainModule { }
