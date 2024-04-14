import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { baserUrl } from './helper';
import {Medicina} from "../interface/Medicina";

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  constructor(private http: HttpClient) {}
  //generamos el token
  public saveMedicine(medicine: any) {
    return this.http.post(`${baserUrl()}/rest/medicines/add`, medicine);
  }

  public getMedicineByMedicine(medicine: any) {
    return this.http.get(`${baserUrl()}/rest/medicines/get`, medicine);
  }

  public getAllMedicamentos(){
    return this.http.get<Medicina[]>(`${baserUrl()}/rest/medicines/get`)
  }

  public modificaMedicina(medicina:Medicina, id:number){
    return this.http.put(`${baserUrl()}/rest/medicines/mod/${id}`, medicina);
  }

  public borrarMed(id: number){
    return this.http.delete(`${baserUrl()}/rest/medicines/delete/${id}`);
  }
}
