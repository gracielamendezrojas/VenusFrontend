import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baserUrl } from './helper';

@Injectable({
  providedIn: 'root',
})

export class NotificationService{

    constructor(private http: HttpClient) {}

    public getAllNotifications(){
        return this.http.get(`${baserUrl()}/rest/notifications/getAllPosts`);
    }

    public readAllNotifications(){
        return this.http.get(`${baserUrl()}/rest/notifications/readNotifications`);
    }


    public sendNextPeriodSMS(){
      return this.http.post(`${baserUrl()}/rest/twilio/sendMessage/nextPeriod`,{});
    }

    public sendNextFertileDaysSMS(){
      return this.http.post(`${baserUrl()}/rest/twilio/sendMessage/nextFertileDay`,{});
    }

    public sendNextPeriodWA(){
      return this.http.post(`${baserUrl()}/rest/wa/sendMessage/nextPeriod`, {});
    }

  public sendNextFertileDaysWA(){
    return this.http.post(`${baserUrl()}/rest/wa/sendMessage/nextFertileDays`, {});
  }

  public sendMonthlyReport(){
    return this.http.get(`${baserUrl()}/rest/notifications/sendMonthlyReport`);
  }

}
