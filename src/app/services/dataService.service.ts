import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baserUrl } from './helper';
import { DataObject } from '../pages/user/user-dashboard/user-dashboard.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public addPeriodCriteriaList(dataArrayList: Array<DataObject>) {
    return this.http.post(
      `${baserUrl()}/rest/period-criteria/create`,
      dataArrayList
    );
  }

  public addComment(comment : any){
    return this.http.post(`${baserUrl()}/rest/comments/add`, comment)
  }

  public getCommentsByPost(idPost: any){
    return this.http.get(`${baserUrl()}/rest/comments/getByPostId/`+idPost);
  }

  public getExistingData(today: string) {
    return this.http.get(
      `${baserUrl()}/rest/period-criteria/getPeriodCriteriaByDate?date=${today}`
    );
  }

  public getPeriodCritiriaLastMonth(){
    return this.http.get(`${baserUrl()}/rest/period-criteria/getPeriodCriteriaLastMonth`);
  }
  
  public getExistingDataById() {
    return this.http.get(
      `${baserUrl()}/rest/period-criteria/getPeriodCriteriaByUser`
    );
  }
  
  public getAveragePeriod() {
    return this.http.get(
        `${baserUrl()}/rest/period-criteria/periodDuration`
    );
  }

  public getNextPeriodDate() {
    return this.http.get(
        `${baserUrl()}/rest/period-criteria/nextPeriodDate`
    );
  }
  public getAverageVariationCycle() {
    return this.http.get(
        `${baserUrl()}/rest/period-criteria/averageVariationCycle`
    );
  }

  public getFertileDays() {
    return this.http.get(
        `${baserUrl()}/rest/period-criteria/fertileDays`
    );
  }
}

