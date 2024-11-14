import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCreateComponent } from './new-create/new-create.component';

const routes: Routes = [
  {
    path: 'new-create',
    component: NewCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
