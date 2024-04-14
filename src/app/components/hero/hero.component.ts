import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  @Input() title: string | undefined;
  @Input() paragraph_left1: string | undefined;
  @Input() paragraph_left2: string | undefined;
  @Input() paragraph_left3: string | undefined;
  @Input() paragraph_left4: string | undefined;
  @Input() image_left: string | undefined;
  @Input() image_right: string | undefined;
}
