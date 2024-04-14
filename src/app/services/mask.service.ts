import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaskService {
  public isLoading:boolean;
  constructor() {
    this.isLoading=false;
    
  }
}
