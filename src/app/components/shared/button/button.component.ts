import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button [ngClass]="{ 'long-button': isLong }" mat-raised-button>
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() isLong: boolean = false;
}
