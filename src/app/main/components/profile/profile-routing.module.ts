import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowedComponent } from './components/borrowed/borrowed.component';
import { ReservedComponent } from './components/reserved/reserved.component';
import { ProfilemodalComponent } from '../modal/profilemodal/profilemodal.component';
import { InsidebookComponent } from '../inside/insidebook/insidebook.component';
import { InsidereservedComponent } from '../inside/insidereserved/insidereserved.component';

const routes: Routes = [
  { path: '', redirectTo: 'borrowed', pathMatch: 'full' },
  { path: 'borrowed', component: BorrowedComponent },
  { path: 'reserved', component: ReservedComponent },
  { path: 'modal', component: ProfilemodalComponent },
  { path: 'book/:id', component: InsidebookComponent },
  { path: 'reservation/:id', component: InsidereservedComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
