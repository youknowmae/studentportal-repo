import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsideperiodicalComponent } from '../../../inside/insideperiodical/insideperiodical.component';

const routes: Routes = [
  { path: '', redirectTo: 'journals', pathMatch: 'full' },
  { path: 'insideperiodical/:id', component: InsideperiodicalComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodicalsRoutingModule { }
