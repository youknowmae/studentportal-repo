import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// LOGIN COMPONENT
import { LoginComponent } from './components/login/login.component';

import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent,children:[
  { path: '', loadChildren: ()=>import('./main/main.module').then((m)=>m.MainModule)}]},
  { path: 'profile', loadChildren: () => import('./main/components/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'periodicals', loadChildren: () => import('./main/components/library/components/periodicals/periodicals.module').then(m => m.PeriodicalsModule) },
  { path: 'articles', loadChildren: () => import('./main/components/library/components/articles/articles.module').then(m => m.ArticlesModule) },
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'dashboard', loadChildren: () => import('./main/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'books', loadChildren: () => import('./main/components/library/components/books/books.module').then(m => m.BooksModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
