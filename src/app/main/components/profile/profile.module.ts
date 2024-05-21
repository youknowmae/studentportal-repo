import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { BorrowedComponent } from './components/borrowed/borrowed.component';
import { ReservedComponent } from './components/reserved/reserved.component';
import { InsideborrowedComponent } from './components/insideborrowed/insideborrowed.component';


@NgModule({
  declarations: [
    BorrowedComponent,
    ReservedComponent,
    InsideborrowedComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
