import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsideannouncementComponent } from '../inside/insideannouncement/insideannouncement.component';

const routes: Routes = [
  { path: '', redirectTo: 'announcement', pathMatch: 'full' },
  { path: 'insideannouncement', component: InsideannouncementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule { }
