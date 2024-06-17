import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnouncementComponent } from './components/announcement/announcement.component';
import { LibraryComponent } from './components/library/library.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReservedComponent } from './components/profile/components/reserved/reserved.component';
import { InsidebookComponent } from './components/inside/insidebook/insidebook.component';
import { ReservemodalComponent } from './components/modal/reservemodal/reservemodal.component';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'announcement', component: AnnouncementComponent },
  { 
    path: 'profile', 
    component: ProfileComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/profile/profile.module').then((m)=>m.ProfileModule)
    }]
  },
  { 
    path: 'library', 
    component: LibraryComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/library/library.module').then((m)=>m.LibraryModule)
    }]
  },
  { path: 'InsidebookComponent', component: ReservemodalComponent}
];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
