import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { LibraryComponent } from './components/library/library.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LibraryModule } from './components/library/library.module';
import { ProfileModule } from './components/profile/profile.module';
import { BooksModule } from './components/library/components/books/books.module';
import { ProfilemodalComponent } from './components/modal/profilemodal/profilemodal.component';
import { ReservemodalComponent } from './components/modal/reservemodal/reservemodal.component';
import { QrmodalComponent } from './components/modal/qrmodal/qrmodal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InsidearticleComponent } from './components/inside/insidearticle/insidearticle.component';
import { InsidereservedComponent } from './components/inside/insidereserved/insidereserved.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    AnnouncementComponent,
    LibraryComponent,
    ProfileComponent,
    ProfilemodalComponent,
    ReservemodalComponent,
    QrmodalComponent,
    InsidereservedComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    LibraryModule,
    ProfileModule,
    BooksModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ]
})
export class MainModule { }
