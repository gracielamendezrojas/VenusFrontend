// input.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <mat-form-field appearance="outline" [ngClass]="{ error: error && !value }">
      <mat-label *ngIf="label">{{ label }}</mat-label>
      <input
        matInput
        [type]="type"
        [placeholder]="placeholder"
        [(ngModel)]="value"
        (input)="onInputChange()"
        required
      />
      <mat-error *ngIf="error && !value">{{ errorMessage }}</mat-error>
      <mat-hint>{{ hint }}</mat-hint>
    </mat-form-field>
  `,
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label: string | undefined;
  @Input() placeholder: string | 'undefined';
  @Input() type: string = 'text';
  @Input() error: boolean | undefined;
  @Input() errorMessage: string | undefined;
  @Input() value: string | undefined;
  @Input() hint: string | undefined;

  @Output() valueChange = new EventEmitter<string>();

  onInputChange() {
    this.valueChange.emit(this.value);
  }
}
