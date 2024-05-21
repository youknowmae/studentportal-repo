import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsidebookComponent } from '../../../inside/insidebook/insidebook.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'book/:id', component: InsidebookComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
