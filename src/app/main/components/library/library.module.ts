import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { InsidebookComponent } from './components/insidebook/insidebook.component';
import { BooksComponent } from './components/books/books.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { PeriodicalsComponent } from './components/periodicals/periodicals.component';


@NgModule({
  declarations: [
    InsidebookComponent,
    BooksComponent,
    ArticlesComponent,
    PeriodicalsComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
