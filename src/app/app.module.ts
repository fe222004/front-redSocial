import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { CustomerCreateComponent } from './pages/customer-support/customer-create/customer-create.component';
import { NavarComponent } from './pages/components/navar/navar.component';
import { MenuComponent } from './pages/components/menu/menu.component';
import { StoriesComponent } from './pages/components/stories/stories.component';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { FormSuscriptorComponent } from './pages/components/form-suscriptor/form-suscriptor.component';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComplaintComponent } from './pages/inspector/complaint/complaint.component';
import { InspectorModule } from './pages/inspector/inspector.module';
import { EditProfileComponent } from './pages/user/edit-profile/edit-profile.component';

import { PostComponent } from './pages/components/post/post.component';

import { ExplorersComponent } from './pages/contents/explorers/explorers.component';
import { FooterComponent } from './pages/components/footer/footer.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerListComponent } from './pages/customer-support/customer-list/customer-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SurveyComponent } from './pages/components/survey/survey.component';
import { NewCreateComponent } from './pages/create/new-create/new-create.component';

import { ProfileComponent } from './pages/user/profile/profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { combineLatest } from 'rxjs';
import { CommentsComponent } from './pages/components/comments/comments.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    NavarComponent,
    CustomerCreateComponent,
    StoriesComponent,
    FormSuscriptorComponent,
  ComplaintComponent,
  ExplorersComponent,
   
    ProfileComponent,
    EditProfileComponent,
    CommentsComponent,
    CommentsComponent,
    ExplorersComponent,
    FooterComponent,
    PostComponent,
    RegisterComponent,
    CustomerListComponent,
    SurveyComponent,
    NewCreateComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    SidebarModule,
    MenubarModule,
    PasswordModule,
    CheckboxModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
