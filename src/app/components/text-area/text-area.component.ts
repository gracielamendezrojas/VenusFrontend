import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
  @Input() name: string | undefined;
  @Input() ngModel: string | undefined;
  @Output() onChange = new EventEmitter<string>();
  textArea = new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.textArea.hasError('required')) {
      return 'Campo requerido';
    }
    return ''
  }

  public onChangeField(event:any){
    this.onChange.emit(event?.target.value);
  }
}
