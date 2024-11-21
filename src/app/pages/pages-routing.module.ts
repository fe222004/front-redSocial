import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ComplaintComponent } from './inspector/complaint/complaint.component';
import { ExplorersComponent } from './contents/explorers/explorers.component';
import { StoriesComponent } from './components/stories/stories.component';

import { PostComponent } from './components/post/post.component';
import { RegisterComponent } from '../components/auth/register/register.component';
import { CustomerCreateComponent } from './customer-support/customer-create/customer-create.component';
import { CustomerListComponent } from './customer-support/customer-list/customer-list.component';
import { CreatorComponent } from './contentCreator/creator/creator.component';
import { SurveyComponent } from './components/survey/survey.component';
import { CommentsComponent } from './components/comments/comments.component';
import { NavarComponent } from './components/navar/navar.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path:'creator',
    component:CreatorComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'contenent',
    loadChildren: () =>
      import('./contents/contents.module').then((m) => m.ContentsModule),
  },
  {
    path: 'c',
    loadChildren: () =>
      import('./contentCreator/page-creator.module').then(
        (m) => m.PageCreatorModule
      ),
  },
  {
    path: 'complaint',
   component: ComplaintComponent,
   },
{
 path:'explorer',
   component: ExplorersComponent
},
  
  {
    path: 'content',
    loadChildren: () =>
      import('./contents/contents.module').then((m) => m.ContentsModule),
  },
  {
    path: 'inspector',
    loadChildren: () =>
      import('./inspector/inspector.module').then((m) => m.InspectorModule),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer-support/customer-support.module').then(
        (m) => m.CustomerSupportModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user-routing.module').then((m) => m.UserRoutingModule),
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./create/create.module').then((m) => m.CreateModule),
  },
  {
    path: 'post',
    component: PostComponent

  },{
    path: 'nav',
    component: NavarComponent

  },
  {
    path: 'customer-create',
    component: CustomerCreateComponent
  },
  {
    path: 'customer-list',
    component: CustomerListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
