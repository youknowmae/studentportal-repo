import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowedComponent } from './components/borrowed/borrowed.component';
import { ReservedComponent } from './components/reserved/reserved.component';
import { ProfilemodalComponent } from '../modal/profilemodal/profilemodal.component';
import { InsideborrowedComponent } from '../inside/insideborrowed/insideborrowed.component';

const routes: Routes = [
  { path: '', redirectTo: 'borrowed', pathMatch: 'full' },
  { path: 'borrowed', component: BorrowedComponent },
  { path: 'reserved', component: ReservedComponent },
  { path: 'modal', component: ProfilemodalComponent },
  { path: 'insideborrowed/:id', component: InsideborrowedComponent }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
