import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageCreatorRoutingModule } from './page-creator-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatorComponent } from './creator/creator.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CreatorComponent], 
  imports: [
    CommonModule,
    PageCreatorRoutingModule,
    ReactiveFormsModule,
  ]
})
export class PageCreatorModule { }
