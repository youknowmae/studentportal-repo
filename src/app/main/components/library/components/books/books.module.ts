import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing.module';
import { InsidebookComponent } from '../../../inside/insidebook/insidebook.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    InsidebookComponent,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MatPaginatorModule
  ]
})
export class BooksModule { }
