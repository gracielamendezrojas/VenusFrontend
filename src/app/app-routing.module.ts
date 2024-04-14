import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { PublicationDetailsComponent } from './pages/publication-details/publication-details.component';
import { UserCalendarComponent } from './pages/user/user-calendar/user-calendar.component';
import { PostsComponent } from './pages/publications/posts/posts.component';
import { AuthguardService } from './authguard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
    data: {roles: ['ADMIN']}
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
    data: {roles: ['USER']}
  },
  {
    path: 'user-calendar',
    component: UserCalendarComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
    data: {roles: ['ADMIN','USER']}
  },
  {
    path: 'password_reset/:userCode',
    component: PasswordResetComponent,
  },
  {
    path: 'perfil',
    component: PerfilUsuarioComponent,
    canActivate: [AuthguardService],
    data: {roles: ['ADMIN','USER']}
  },
  {
    path: 'community/publication-details',
    component: PublicationDetailsComponent,
    canActivate: [AuthguardService],
    data: {roles: ['ADMIN']}
  },
  {
    path: 'community/publication-details/:postId',
    component: PublicationDetailsComponent,
    canActivate: [AuthguardService],
    data: {roles: ['ADMIN']}
  },
  {
    path: 'community/publication-posts',
    component: PostsComponent,
    pathMatch: 'full',
    canActivate: [AuthguardService],
    data: {roles: ['ADMIN','USER']}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
