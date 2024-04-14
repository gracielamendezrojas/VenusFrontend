import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `<mat-card>
    <ng-content></ng-content>
  </mat-card> `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {}
