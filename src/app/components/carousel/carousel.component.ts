// import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit, } from '@angular/core';
import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule,  } from '@angular/common';
import {CardComponent} from "../card/card.component";


@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CarouselComponent implements AfterViewInit {
  title:string = 'My Notes';
  slides = [
    {
      'src': '/assets/Testimony1.jpg',
      'testimony': '"Venus me ha permitido alejarme de los efectos secundarios de los fármacos."',
      'name': 'Laura Sáenz'
    },
    {
      'src': '/assets/Testimony2.jpg',
      'testimony': '"Gracias a Venus pude concebir a mis dos hijos." ',
      'name': 'Marta Huertas'
    },
    {
      'src': '/assets/Testimony3.jpg',
      'testimony': '"Esta aplicación me permitió decidir cuándo quedar embarazada."',
      'name':'Verónica Méndez'
    },
    {
      'src': '/assets/Testimony4.jpg',
      'testimony': '"Nos decían que eramos infértiles... ahora somos padres de 3 niños."',
      'name':'Ana Corrales'
    },
    {
      'src': '/assets/Testimony6.jpg',
      'testimony': '"Me siento en sintonía con mi cuerpo desde que dejé los fármacos anticonceptivos."',
      'name':'Susana Retana'
    },
    {
      'src': '/assets/Testimony5.jpg',
      'testimony': '"Venus es mi nuevo anticonceptivo."',
      'name':'Francel Quirós'
    }
  ]

  ngAfterViewInit(): void {
    // swiper element
    const swiperEl = document.querySelector('swiper-container' );
    if( !swiperEl) {return}


    // swiper parameters
    const swiperParams = {
      centeredSlides: true,
      centeredSlidesBounds:true,
      navigation: {
        enabled: true},
      breakpoints: {
        640: {
          slidesPerView: 1,
        },
        850: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
      on: {
        init() {

        },
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperEl, swiperParams);

    // and now initialize it
    swiperEl.initialize();
  }

}
