import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baserUrl } from './helper';
import { NotificationService } from './notifications.service';

@Injectable({
  providedIn: 'root',
})

export class NotificationDataService{
    public notifications : any[]
    constructor(private notificationService : NotificationService) {
        this.notifications = [];
    }

  getNotifications(){
    this.notificationService.getAllNotifications().subscribe((response : any)=> {
        this.notifications = response
      })
  }
}