import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CalendarView, CalendarEvent } from 'angular-calendar';
import { DataService } from 'src/app/services/dataService.service';
import { DialogService } from 'src/app/services/dialog.service';
import { parseISO } from 'date-fns';
import { MaskService } from 'src/app/services/mask.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private dialogService: DialogService,
    public maskService: MaskService
  ) {}

  public periodCriteria = {
    date: '',
    fieldName: '',
    value: null,
  };

  groupedData: any[] = [];
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  events: CalendarEvent[] = [];
  fertilePeriod: any = {};

  ngOnInit() {
    this.maskService.isLoading = true;

    // Obtener los días fértiles y guardarlos en la variable fertilePeriod
    this.getFertileDays().subscribe((data) => {
      this.fertilePeriod = data;

      // Utilizar groupedData para otros fines (criterios de campos, etc.)
      this.getDataById().subscribe((existingData) => {
        this.groupedData = this.groupAndCombineFieldsByDate(existingData);
      });
    });
  }

  getFertileDays() {
    return this.dataService.getFertileDays();
  }

  getDataById() {
    return this.dataService.getExistingDataById();
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    const clickedDate = date.toISOString().split('T')[0];
    const selectedData = this.groupedData.find(
      (data) => data.date.toISOString().split('T')[0] === clickedDate
    );
    if (selectedData) {
      // Abre el diálogo utilizando tu servicio de diálogo
      this.dialogService.openDialog(selectedData);
    }
  }
  groupAndCombineFieldsByDate(data: any) {
    const grouped: Record<string, Record<string, any>> = {};

    // Agrupa los datos por fecha
    data.forEach((item: any) => {
      const { date, fieldName, value } = item;
      if (!grouped[date]) {
        grouped[date] = {
          date: date,
        };
      }

      grouped[date][fieldName] = value;
    });

    // Crea el objeto consolidado y ajusta las fechas al formato "día/mes/año"
    const consolidatedData = [];
    for (const date in grouped) {
      const consolidatedItem: Record<string, any> = {
        date: parseISO(date), // Ajusta la fecha al comienzo del día
      };
      for (const fieldName in grouped[date]) {
        if (fieldName !== 'date') {
          consolidatedItem[fieldName] = grouped[date][fieldName];
        }
      }
      consolidatedData.push(consolidatedItem);
    }

    // Crea eventos para los días fértiles y agrégalos al arreglo events
    const firstFertileDate = new Date(this.fertilePeriod.firstDate);
    const lastFertileDate = new Date(this.fertilePeriod.lastDate);

    // Genera un array de fechas entre la fecha de inicio y fin del período fértil
    const dateRange: Date[] = this.generateDateRange(
      firstFertileDate,
      lastFertileDate
    );

    // Crea eventos para cada fecha dentro del rango y agrégalos al arreglo events
    const pinkDotEvents: CalendarEvent[] = dateRange.map((date: Date) => ({
      start: date,
      title: 'Pronóstico de fertilidad',
      cssClass: `cal-event dot-pink`,
    }));

    // Agrega los eventos de días fértiles adicionales al arreglo events
    this.events = this.events.concat(pinkDotEvents);

    consolidatedData.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    console.log(consolidatedData);

    const startDates = consolidatedData.filter(
      (item) => item['periodCycle'] === 'Inicio'
    );

    const endDates = consolidatedData.filter(
      (item) => item['periodCycle'] === 'Fin'
    );

    startDates.forEach((startDateItem) => {
      const startDate = startDateItem['date'];
      const endDateItem = endDates.find((item) => item['date'] > startDate);

      if (endDateItem) {
        const endDate = endDateItem['date'];

        // Generar el rango de fechas entre 'inicio' y 'fin'
        const dateRange: Date[] = this.generateDateRange(startDate, endDate);

        // Crear eventos para el rango de fechas y agregarlos al arreglo events
        const cycleEvents: CalendarEvent[] = dateRange.map((date) => ({
          start: date,
          title: 'Día de menstruación',
          cssClass: 'cal-event dot-red',
        }));

        this.events = this.events.concat(cycleEvents);
      }
    });

    // Transforma los datos consolidados en objetos CalendarEvent
    const calendarEvents: CalendarEvent[] = consolidatedData.map(
      (consolidatedItem: Record<string, any>) => {
        return {
          start: consolidatedItem['date'],
          title: 'Día con información',
          cssClass: `cal-event dot-green`,
        };
      }
    );

    // Agrega los eventos generados al arreglo events
    this.events = this.events.concat(calendarEvents);
    this.maskService.isLoading = false;
    return consolidatedData;
  }

  generateDateRange(startDate: Date, endDate: Date): Date[] {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }
}
