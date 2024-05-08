import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsidebookComponent } from './components/insidebook/insidebook.component';
import { ModalComponent } from './components/modal/modal.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'book/:id', component: InsidebookComponent },
  { path: 'modal', component: ModalComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
