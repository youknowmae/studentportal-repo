import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { InsidebookComponent } from './components/insidebook/insidebook.component';


@NgModule({
  declarations: [
    InsidebookComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
  ]
})
export class BooksModule { }
