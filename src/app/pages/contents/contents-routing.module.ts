import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorersComponent } from './explorers/explorers.component';

const routes: Routes = [
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentsRoutingModule { }
