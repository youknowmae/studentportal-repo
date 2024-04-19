import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// LOGIN COMPONENT
import { LoginComponent } from './components/login/login.component';

import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'main', 
    component: MainComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./main/main.module').then((m)=>m.MainModule)
    }]
  },
  { path: 'profile', loadChildren: () => import('./main/components/profile/profile.module').then(m => m.ProfileModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
