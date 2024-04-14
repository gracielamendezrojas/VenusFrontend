import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { PasswordResetComponent } from './pages/password-reset/password-reset.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DialogPasswordResetComponent } from './pages/login/dialog-password-reset/dialog-password-reset.component';
import { register } from 'swiper/element/bundle';
register();
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { FormBuilder } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartsModule } from '@carbon/charts-angular';

import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DialogService } from 'src/app/services/dialog.service';
// calendar
import { CalendarComponent } from './components/user/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { UserCalendarComponent } from './pages/user/user-calendar/user-calendar.component';
import { DialogDataComponent } from './components/dialog-data/dialog-data.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PostsComponent } from './pages/publications/posts/posts.component';
import { DialogPostsComponent } from './components/publications/dialog-posts/dialog-posts.component';
import { ModalEditarMedicinaComponent } from './pages/perfil-usuario/modal-editar-medicina/modal-editar-medicina.component';
import { MaskLoaderComponent } from './components/mask-loader/mask-loader.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);
import { ButtonComponent } from './components/shared/button/button.component';
import { InputComponent } from './components/shared/input/input.component';
import { ContainerComponent } from './components/shared/container/container.component';
import { CardComponent } from './components/shared/card/card.component';
import { TitleComponent } from './components/shared/title/title.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    UserDashboardComponent,
    PasswordResetComponent,
    DialogPasswordResetComponent,
    CalendarComponent,
    UserCalendarComponent,
    CalendarComponent,
    DialogDataComponent,
    NotificationsComponent,
    PostsComponent,
    DialogPostsComponent,
    ModalEditarMedicinaComponent,
    MaskLoaderComponent,
    ButtonComponent,
    InputComponent,
    ContainerComponent,
    CardComponent,
    TitleComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatSelectModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatRadioModule,
    MatSliderModule,
    ReactiveFormsModule,
    ChartsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [authInterceptorProviders, DialogService],
  bootstrap: [AppComponent],
  exports: [ModalEditarMedicinaComponent],
})
export class AppModule {}
