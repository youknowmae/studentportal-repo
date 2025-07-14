import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// LOGIN COMPONENT
import { LoginComponent } from './components/login/login.component';

import { MainComponent } from './main/main.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./main/main.module').then((m) => m.MainModule),
      },
    ],
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./main/components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'periodicals',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(
        './main/components/library/components/periodicals/periodicals.module'
      ).then((m) => m.PeriodicalsModule),
  },
  {
    path: 'articles',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(
        './main/components/library/components/articles/articles.module'
      ).then((m) => m.ArticlesModule),
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'books',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./main/components/library/components/books/books.module').then(
        (m) => m.BooksModule
      ),
  },
  {
    path: 'academic',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(
        './main/components/library/components/academic/academic.module'
      ).then((m) => m.AcademicModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
