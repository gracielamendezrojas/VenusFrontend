import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent{
  @Input() name: string | undefined;
  @Input() placeholder: string | undefined;
  @Input() ngModel: string | undefined;
  @Output() onChange = new EventEmitter<string>();

  input = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.input.hasError('required')) {
      return 'Debes digitar tu información.';
    }

    return this.input.hasError('input') ? 'Campo vacío' : '';
  }

  public onChangeField(event:any){
    this.onChange.emit(event?.target.value);
  }
}
