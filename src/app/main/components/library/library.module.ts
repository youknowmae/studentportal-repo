import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LibraryRoutingModule } from './library-routing.module';
import { BooksComponent } from './components/books/books.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { PeriodicalsComponent } from './components/periodicals/periodicals.component';
import { PeriodicalsModule } from './components/periodicals/periodicals.module';
import { ArticlesModule } from './components/articles/articles.module';
import { BooksModule } from './components/books/books.module';
import { AcademicComponent } from './components/academic/academic.component';


@NgModule({
  declarations: [
    BooksComponent,
    ArticlesComponent,
    PeriodicalsComponent,
    AcademicComponent,
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    PeriodicalsModule,
    ArticlesModule,
    BooksModule,
    FormsModule
  ]
})
export class LibraryModule { }