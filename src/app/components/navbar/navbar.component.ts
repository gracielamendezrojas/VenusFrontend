import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsComponent } from '../notifications/notifications.component';
import { NotificationDataService } from 'src/app/services/notificationDataService';
import { NotificationService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  visibility = false;
  isLoggedIn = false;
  user: any = null;
  currentRoute: string = '';

  constructor(
    public login: LoginService,
    private router: Router,
    private dialog: MatDialog,
    public notificationDataService: NotificationDataService,
    private notificationService: NotificationService
  ) {
    // Suscríbete al evento NavigationEnd para obtener la URL una vez que la navegación se completa
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.notificationDataService.getNotifications();
    this.login.loginStatusSubjec.asObservable().subscribe((data) => {
      this.user = this.login.getUser();
    });
  }

  notificationsVisibility() {
    this.notificationService
      .readAllNotifications()
      .subscribe((data) => this.notificationDataService.getNotifications());
  }

  public logout() {
    this.login.logout();
    this.router.navigate(['/']);
    this.isLoggedIn = false;
    this.user = null;
  }

  openDialog() {
    this.dialog.open(NotificationsComponent, {
      width: '500px',
      position: { right: '1px', top: '63px' },
    });
  }

  get getUnreadNotifications(): number {
    return this.notificationDataService.notifications.filter(
      (notification) => !notification.open
    ).length;
  }

  isAdmin() {
    const role = this.login.getUserRole();
    return role === 'ADMIN';
  }
}
