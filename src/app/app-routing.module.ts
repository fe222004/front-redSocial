import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { ErrorComponent } from './components/auth/error/error.component';
import { AccessComponent } from './components/auth/access/access.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ComplaintComponent } from './pages/inspector/complaint/complaint.component';
import { ExplorersComponent } from './pages/contents/explorers/explorers.component';
import { FormSuscriptorComponent } from './pages/components/form-suscriptor/form-suscriptor.component';
import { CreatorComponent } from './pages/contentCreator/creator/creator.component';
import { SurveyComponent } from './pages/components/survey/survey.component';
import { EditProfileComponent } from './pages/user/edit-profile/edit-profile.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    // canActivate: [AuthGuard]
  },
  //Ruta encuesta
  {
    path: 'survery',
    component: SurveyComponent

  },
  {
    path: 'edit/:id',
    component: EditProfileComponent

  },
  {
    path: 'notfound',
    component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: '/notfound'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
