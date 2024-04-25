import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { BooksComponent } from './components/books/books.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { PeriodicalsComponent } from './components/periodicals/periodicals.component';
import { PeriodicalsModule } from './components/periodicals/periodicals.module';
import { ArticlesModule } from './components/articles/articles.module';
import { InsidebookComponent } from './components/insidebook/insidebook.component';


@NgModule({
  declarations: [
    BooksComponent,
    ArticlesComponent,
    PeriodicalsComponent,
    InsidebookComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    PeriodicalsModule,
    ArticlesModule
  ]
})
export class LibraryModule { }
