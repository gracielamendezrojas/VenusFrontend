import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaskService } from './services/mask.service';
import { MaskLoaderComponent } from './components/mask-loader/mask-loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'venus';
  constructor(private router: Router, public maskService:MaskService) {}

  shouldShowNavbar() {
    const currentRoute = this.router.url;
    return currentRoute !== '/signup' && currentRoute !== '/login'; //
  }
}
