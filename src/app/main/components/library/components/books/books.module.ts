import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { InsidebookComponent } from './components/insidebook/insidebook.component';
import { ModalComponent } from './components/modal/modal.component';


@NgModule({
  declarations: [
    InsidebookComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule
  ]
})
export class BooksModule { }
