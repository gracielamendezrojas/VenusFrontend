import { Component } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `<h1 class="text-center">
    <ng-content></ng-content>
  </h1>`,
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {}
