import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { BooksComponent } from './components/books/books.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { PeriodicalsComponent } from './components/periodicals/periodicals.component';
import { PeriodicalsModule } from './components/periodicals/periodicals.module';
import { ArticlesModule } from './components/articles/articles.module';
import { BooksModule } from './components/books/books.module';


@NgModule({
  declarations: [
    BooksComponent,
    ArticlesComponent,
    PeriodicalsComponent,
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    PeriodicalsModule,
    ArticlesModule,
    BooksModule
  ]
})
export class LibraryModule { }