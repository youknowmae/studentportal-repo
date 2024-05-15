import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { PeriodicalsComponent } from './components/periodicals/periodicals.component';
import { InsidebookComponent } from './components/books/components/insidebook/insidebook.component';
import { AcademicComponent } from './components/academic/academic.component';


const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'insidebook', component: InsidebookComponent},
  { path: 'academic', component: AcademicComponent},
  { 
    path: 'books', 
    component: BooksComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/books/books.module').then((m)=>m.BooksModule)
    }]
  },
  { 
    path: 'articles', 
    component: ArticlesComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/articles/articles.module').then((m)=>m.ArticlesModule)
    }]
  },
  { 
    path: 'periodicals', 
    component: PeriodicalsComponent,
    children: [{
      path: '',
      loadChildren: ()=>import('./components/periodicals/periodicals.module').then((m)=>m.PeriodicalsModule)
    }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
