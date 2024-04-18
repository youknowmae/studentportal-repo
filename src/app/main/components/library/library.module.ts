import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';
import { InsidebookComponent } from './components/insidebook/insidebook.component';


@NgModule({
  declarations: [
    LibraryComponent,
    InsidebookComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
