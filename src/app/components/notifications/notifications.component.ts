import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notifications.service';
import { NotificationDataService } from 'src/app/services/notificationDataService';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {

  constructor(public notificationDataService:NotificationDataService) {}

  ngOnInit(): void {
      this.notificationDataService.getNotifications()
  }
}
