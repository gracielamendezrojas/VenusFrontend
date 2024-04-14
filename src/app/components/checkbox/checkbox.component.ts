import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @Input() description: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
