import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from '../../components/hero/hero.component';
import { CardComponent } from '../../components/card/card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { InputComponent } from '../../components/input/input.component';
import { InputEmailComponent } from '../../components/input-email/input-email.component';
import { ButtonComponent } from '../../components/button/button.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { TextComponent } from '../../components/text/text.component';
import { TextAreaComponent } from '../../components/text-area/text-area.component';
import { FormsModule } from '@angular/forms';

interface CardData {
  title: string;
  subtitle: string;
  image: string;
}
const data: CardData[] = [
  {
    title: 'Registro de la menstruación',
    subtitle:
      'Podrás guardar los datos de tu menstruación, desde fechas hasta detalles como el color y la cantidad de flujo.',
    image: 'assets/PeriodCalendar.png',
  },
  {
    title: 'Prevención',
    subtitle:
      'Cuando tus registros muestren datos que puedan comprometer tu salud, te alertaremos para que tengas la intervención necesaria.',
    image: 'assets/Doctor.png',
  },

  {
    title: 'Notificaciones',
    subtitle:
      'Podrás recibir mensajes de texto, mensajes de WhatsApp y correos con pronósticos y datos de tu ciclo femenino.',
    image: 'assets/Notifications.png',
  },
  {
    title: 'Hábitos, síntomas y otros',
    subtitle:
      'Serás capaz de llevar un registro diario relacionados a la vida sexual, sueño, emociones, dolores y otros.',
    image: 'assets/Emotions.png',
  },
  {
    title: 'Fertilidad',
    subtitle:
      'Gracias al método sintotérmico basado en el registro de temperatura y fluidos cervicales, podrás conocer tus días fértiles.',
    image: 'assets/Fertility.png',
  },
  {
    title: 'Publicaciones médicas',
    subtitle:
      'Tendrás a tu disposición artículos de profesionales, que están relacionados con salud y el ciclo femenino.',
    image: 'assets/Education.png',
  },
];

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [
    CommonModule,
    HeroComponent,
    CardComponent,
    TextComponent,
    FooterComponent,
    InputComponent,
    InputEmailComponent,
    ButtonComponent,
    TextAreaComponent,
    CarouselComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  cardData: CardData[] = data;

  sendEmail() {}
}
