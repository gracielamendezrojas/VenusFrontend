import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { warn } from 'console';

@Component({
  selector: 'app-mask-loader',
  standalone: false,
  templateUrl: './mask-loader.component.html',
  styleUrls: ['./mask-loader.component.scss']
})


export class MaskLoaderComponent {

  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
}
