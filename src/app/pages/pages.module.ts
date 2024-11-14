import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';

import { InspectorModule } from './inspector/inspector.module';
  import { MenuComponent } from './components/menu/menu.component';
import { NavarComponent } from './components/navar/navar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PageCreatorModule } from './contentCreator/page-creator.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    
    RouterModule,
    ReactiveFormsModule,
    PageCreatorModule 
  ]
})
export class PagesModule { }
