import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';
import { InsidebookComponent } from './components/insidebook/insidebook.component';
import { BooksComponent } from './components/books/books.component';


@NgModule({
  declarations: [
    InsidebookComponent,
    BooksComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
