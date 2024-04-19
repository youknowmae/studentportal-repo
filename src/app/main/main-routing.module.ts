import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnnouncementComponent } from './components/announcement/announcement.component';
import { LibraryComponent } from './components/library/library.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
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
  }];
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
