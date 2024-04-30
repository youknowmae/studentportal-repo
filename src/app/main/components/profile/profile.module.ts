import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { BorrowedComponent } from './components/borrowed/borrowed.component';
import { ReservedComponent } from './components/reserved/reserved.component';
import { HistoryComponent } from './components/history/history.component';
import { ProfilePopupComponent } from './components/popup/profile-popup/profile-popup.component';


@NgModule({
  declarations: [
    BorrowedComponent,
    ReservedComponent,
    HistoryComponent,
    ProfilePopupComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
