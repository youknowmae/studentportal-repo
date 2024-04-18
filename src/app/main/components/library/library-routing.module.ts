import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsidebookComponent } from './components/insidebook/insidebook.component';
import { BooksComponent } from './components/books/books.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'insidebook', component: InsidebookComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
