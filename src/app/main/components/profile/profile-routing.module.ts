import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BorrowedComponent } from './components/borrowed/borrowed.component';
import { ReservedComponent } from './components/reserved/reserved.component';


const routes: Routes = [
  { path: '', redirectTo: 'borrowed', pathMatch: 'full' },
  { path: 'borrowed', component: BorrowedComponent },
  { path: 'reserved', component: ReservedComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
