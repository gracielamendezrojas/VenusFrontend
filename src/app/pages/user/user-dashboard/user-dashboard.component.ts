import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/dataService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicineService } from 'src/app/services/medicine.service';
import { NotificationDataService } from 'src/app/services/notificationDataService';
import { MaskService } from 'src/app/services/mask.service';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Medicina} from "../../../interface/Medicina";
import { LoginService } from 'src/app/services/login.service';
import html2canvas from 'html2canvas';
import * as FileSaver from 'file-saver';

export type DataObject = {
  fieldName: string;
  value: any;
  date: Date;
};

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  date!: any;
  periodCycle!: String | null;
  opened = false;
  periodAmount!: String | null;
  periodColor!: String | null;
  fluidAmount!: String | null;
  fluidColor!: String | null;
  openedForm: boolean = false;
  emotionalState!: number | null;
  physicalState!: number | null;
  sleepHours!: number | null;
  temperature!: number | null;
  sexTimes!: String | null;
  emotionType!: String | null;
  painType!: String | null;
  meds: Array<String> = new Array();
  dataArrayList: Array<DataObject> = [];
  hasDevice: boolean;
  colors: any  = ['#FF0000', '#00FF00', '#0000FF'];

  optionsLineal: any = {
    title: 'Temperatura (Cº)',
    toolbar:{
      enabled: false
    },
    axes: {
      left: {
        title: 'Grados (Cº)',
        stacked: true,
       // scaleType: 'linear',
        mapsTo: 'value',
      },
      bottom: {
        title: 'Fecha',
        scaleType: 'labels',
        mapsTo: 'date',
      },
    },

    curve: 'curveMonotoneX',
    height: '400px',
    width: '100%',
    color: {
      "scale": {
        "Temperatura (C°)": "#f25287",
      }
    },
  };

  dataLineal: any = [];
  optionsCircle: any = {
    title: 'Horas de sueño',
    toolbar:{
      enabled: false
    },
    axes: {
      left: {
        mapsTo: 'date',
        scaleType: 'labels',
      },
      bottom: {
        mapsTo: 'value',
        domain :[0,14]
      },
    },
    height: '400px',
    color: {
      "scale": {
        "Horas de sueño": "#f25287",
      }
    },
  };

  optionsSpike2: any = {
    title: 'Temperatura (C°)',
    toolbar:{
      enabled: false
    },
    axis: {
      x: {
        ticks: {
          // You can configure the number of decimal places for the x-axis here
          precision: 2, // for example, set precision to 2 for two decimal places
        },
      },
      y: {
        // Similarly, you can configure the number of decimal places for the y-axis here
        ticks: {
          precision: 2,
        },
      },
    },
    axes: {
      bottom: {
        title: 'Fecha',
        mapsTo: 'date',
        scaleType: 'labels',
      },
      left: {
        mapsTo: 'value',
        title: 'Temperatura',
        scaleType: 'labels',
      },
    },
    height: '400px',
    width: '100%',
    color: {
      "scale": {
        "Temperatura (C°)": "#f25287",
      }
    },
  };
  dataSpike2: any = [];
  dataCircle: any = [];
  optionsSpike: any = {
    title: 'Flujo cervical',
    toolbar:{
      enabled: false
    },
    axes: {
      bottom: {
        title: 'Fecha',
        mapsTo: 'key',
        scaleType: 'labels',
      },
      left: {
        mapsTo: 'value',
        title: 'Tipo',
        scaleType: 'labels',
      },
    },
    height: '350px',
    width: '100%',
     color: {
      "scale": {
        "Flujo Cervical": "#f25287",
      }
    },
  };
  dataSpike: any = [];
  optionsRadar: any = {
    toolbar:{
      enabled: false
    },
    radar: {
      axes: {
        angle: 'feature',
        value: 'score',
      },
    },
    data: {
      groupMapsTo: 'product',
    },
    height: '25vh',
    width: '100%',
     color: {
      "scale": {
        "Sentimientos": "#f25287",
      }
    },
  };
  dataRadarPain: any = [
    {
      product: 'Sentimientos',
      feature: 'Dolor generalizado',
      score: 0,
    },
    {
      product: 'Sentimientos',
      feature: 'Dolor de cabeza',
      score: 0,
    },
    {
      product: 'Sentimientos',
      feature: 'Dolor pélvico',
      score: 0,
    },
    {
      product: 'Sentimientos',
      feature: 'Hinchazón abdominal',
      score: 0,
    },
    {
      product: 'Sentimientos',
      feature: ' Cólicos menstruales',
      score: 0,
    },
    {
      product: 'Sentimientos',
      feature: 'Sensibilidad en mamas',
      score: 0,
    },
    {
      product: 'Sentimientos',
      feature: 'Dolor lumbar',
      score: 0,
    },
  ];
  dataRadarEmotion: any = [
    {
      product: 'Sentimientos',
      feature: 'Cambios de humor',
      score: 0,
    },
    {
      product: 'Sentimientos',
      feature: 'Ansiedad',
      score: 0,
    },
    {
      product: 'Sentimientos',
      feature: 'Depresión',
      score: 0,
    },
    {
      product: 'Sentimientos',
      feature: 'Fatiga',
      score: 0,
    },
    {
      product: 'Sentimientos',
      feature: 'Irritabilidad',
      score: 0,
    },
    {
      product: 'Sentimientos',
      feature: 'Estrés',
      score: 0,
    },
  ];
  loading: boolean = true;
  panelOpenState: boolean = true;
  constructor(
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    private notificationDataService : NotificationDataService,
    private medicineService: MedicineService,
    private maskService : MaskService,
    public loginService: LoginService
    ) {}

  ngOnInit():void {
    const today = new Date();
    today.setHours(today.getHours() - 6);
    this.hasDevice = this.loginService.getUser().hasDevice;
    this.setFormValues(today.toISOString().split('T')[0]);
    this.getChartsData();
    this.dataService.getAveragePeriod().subscribe((data:any) =>{
        if(data.average != null){
          this.periodAverageDuration = data.average + " días";
        }else{
          this.periodAverageDuration = "No hay suficientes datos.";
        }
      }
  );
    this.dataService.getAverageVariationCycle().subscribe((data: any) => {
      if (data.average != null) {
        this.averagePeriodVariation = data.average + ' días';
      } else {
        this.averagePeriodVariation = 'No hay suficientes datos.';
      }
    });
    this.dataService.getNextPeriodDate().subscribe((data: any) => {
      if (data.date != null) {
        this.nextPeriod = data.date;
      }
    });
    this.dataService.getFertileDays().subscribe((data: any) => {
      if (data.firstDate != null && data.lastDate != '') {
        this.firstFertileDay = data.firstDate;
        this.lastFertileDay = data.lastDate;
      } else {
        this.noFertileDays = 'No hay suficientes datos.';
      }
    });

    this.fetchMedications();
  }

  captureAndDownload(id:any) {
    const element = document.getElementById(id);
    if (!element) {
      console.error('El elemento no fue encontrado');
      return;
    }
    html2canvas(element).then(canvas => {
      canvas.toBlob(blob => {
        if (blob) {
          FileSaver.saveAs(blob, id+'.png');
        }
      });
    });
  }

  getPredictions(){
    this.dataService.getAveragePeriod().subscribe((data:any) =>{
      if(data.average != null){
        this.periodAverageDuration = data.average + " días";
      }else{
        this.periodAverageDuration = "No hay suficientes datos.";
      }
    }
);
  this.dataService.getAverageVariationCycle().subscribe((data: any) => {
    if (data.average != null) {
      this.averagePeriodVariation = data.average + ' días';
    } else {
      this.averagePeriodVariation = 'No hay suficientes datos.';
    }
  });
  this.dataService.getNextPeriodDate().subscribe((data: any) => {
    if (data.date != null) {
      this.nextPeriod = data.date;
    }
  });
  this.dataService.getFertileDays().subscribe((data: any) => {
    if (data.firstDate != null && data.lastDate != '') {
      this.firstFertileDay = data.firstDate;
      this.lastFertileDay = data.lastDate;
    } else {
      this.noFertileDays = 'No hay suficientes datos.';
    }
  });
  }

  cleanCharts(){
    this.dataLineal = [];
    this.dataSpike = [];
    this.dataCircle = [];
    for (let i = 0; i < this.dataRadarEmotion.length; i++) {
    this.dataRadarEmotion[i].score = 0;
    }
    for (let i = 0; i < this.dataRadarPain.length; i++) {
        this.dataRadarPain[i].score = 0
    }
  }

  getChartsData() {
    this.loading = true;
    this.cleanCharts();
     this.dataService.getPeriodCritiriaLastMonth().subscribe((response: any) => {
        for (let i = 0; i < response.length; i++) {
          let item = response[i];
          switch (item.fieldName) {
            case 'temperature':
              if(item.value){
               this.dataLineal.push({
                group: 'Temperatura (C°)',
                date: item.date.replace(/-/g, '/').toString(),
                value: parseFloat(item.value),
              });
                this.dataSpike2.push({
                  group: 'Temperatura (C°)',
                  date:this.convertirFecha(item.date.replace(/-/g, '/').toString()),
                  value: parseFloat(item.value),
                });
            }
              console.log(this.dataLineal);
            break;
          case 'fluidAmount':
            if (item.value) {
              this.dataSpike.push({
                group: 'Flujo Cervical',
                key: this.convertirFecha(item.date.replace(/-/g, '/').toString()),
                value: (item.value != null) ? item.value  : 0,
              });
            }
            break;
            case 'sexTimes':
             this.dataCircle = this.dataCircle.map((objeto:any) => {
                if (objeto.group == item.value) {
                  return { ...objeto, value: objeto.value + 1 };
                }
                return objeto;
              });
          break;
            case 'emotionType':
               for (let i = 0; i < this.dataRadarEmotion.length; i++) {
                if (this.dataRadarEmotion[i].feature == item.value) {
                  this.dataRadarEmotion[i].score = this.dataRadarEmotion[i].score + 1;
                }
              }
            break;
            case 'painType':
                 for (let i = 0; i < this.dataRadarPain.length; i++) {
                  if (this.dataRadarPain[i].feature == item.value) {
                    this.dataRadarPain[i].score = this.dataRadarPain[i].score + 1;
                  }
                }
              break;
              case 'sleepHours':
                if(item.value){
                   this.dataCircle.push({
                  group: 'Horas de sueño',
                  date: this.convertirFecha(item.date.replace(/-/g, '/').toString()),
                  value: [item.value],
                });
                }
              break;
        }
      }
      this.loading = false;
    });
  }

   convertirFecha(fechaString: any) {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    const fecha = new Date(fechaString);
    const diaSemana = diasSemana[fecha.getDay()];
    const diaMes = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    return `${diaSemana}, ${mes} - ${diaMes < 10 ? '0' : ''}${diaMes} `;
   }

  createDataArrayList() {
    console.log('crear forma')
    //define date
    if (this.date == undefined) this.date = new Date();
    if (this.periodCycle)
      this.dataArrayList.push({
        fieldName: 'periodCycle',
        value: this.periodCycle?.toString(),
        date: this.date,
      });
    if (this.periodAmount)
      this.dataArrayList.push({
        fieldName: 'periodAmount',
        value: this.periodAmount?.toString(),
        date: this.date,
      });
    if (this.periodColor)
      this.dataArrayList.push({
        fieldName: 'periodColor',
        value: this.periodColor?.toString(),
        date: this.date,
      });
    if (this.fluidAmount)
      this.dataArrayList.push({
        fieldName: 'fluidAmount',
        value: this.fluidAmount?.toString(),
        date: this.date,
      });
    if (this.fluidColor)
      this.dataArrayList.push({
        fieldName: 'fluidColor',
        value: this.fluidColor?.toString(),
        date: this.date,
      });
    if (this.emotionalState)
      this.dataArrayList.push({
        fieldName: 'emotionalState',
        value: this.emotionalState?.toString(),
        date: this.date,
      });
    if (this.physicalState)
      this.dataArrayList.push({
        fieldName: 'physicalState',
        value: this.physicalState?.toString(),
        date: this.date,
      });
    if (this.sleepHours) {
      if (this.sleepHours < 0) {
        this._snackBar.open('Las horas de sueño no pueden ser negativas.', undefined, {
          duration: 5 * 1000,
        });
        return; // Detiene el proceso de guardar cambios
      }
      if (this.sleepHours >= 23) {
        this._snackBar.open('Las horas de sueño no pueden ser mayores a 23.', undefined, {
          duration: 5 * 1000,
        });
        return; // Detiene el proceso de guardar cambios
      }
      this.dataArrayList.push({
        fieldName: 'sleepHours',
        value: this.sleepHours?.toString(),
        date: this.date,
      })
    };
    if (this.temperature) {
      if (this.temperature < 35 || this.temperature > 42) {
        this._snackBar.open('La temperatura debe estar entre 35°C y 42°C.', undefined, {
          duration: 5 * 1000,
        });
        return;
      }
      const temperatureRegex = /^\d+\.\d{2}$/; // Expresión regular para dos decimales
      if (!temperatureRegex.test(this.temperature.toString())) {
        this._snackBar.open('La temperatura debe tener exactamente dos decimales.', undefined, {
          duration: 5 * 1000,
        });
        return; // Detiene el proceso de guardar cambios
      }

      this.dataArrayList.push({
        fieldName: 'temperature',
        value: this.temperature?.toString(),
        date: this.date,
      })
    };
    if (this.sexTimes)
      this.dataArrayList.push({
        fieldName: 'sexTimes',
        value: this.sexTimes?.toString(),
        date: this.date,
      });
    if (this.painType)
      this.dataArrayList.push({
        fieldName: 'painType',
        value: this.painType?.toString(),
        date: this.date,
      });
    if (this.emotionType)
      this.dataArrayList.push({
        fieldName: 'emotionType',
        value: this.emotionType?.toString(),
        date: this.date,
      });
    if(this.medOpcionesChecked)
      this.dataArrayList.push({
        fieldName: 'medication',
        value: this.medOpcionesChecked.toString(),
        date: this.date,
      })

    if (this.dataArrayList.length > 0) {
      this.maskService.isLoading = true;
      this.dataService.addPeriodCriteriaList(this.dataArrayList).subscribe(
        (data: any) => {
          this._snackBar.open(data.Message, undefined, { duration: 5 * 1000 });
          this.dataArrayList = [];
          this.notificationDataService.getNotifications();
          this.getChartsData();
          this.getPredictions();
          this.maskService.isLoading = false;
        },
        (error: any) => {
          if (error.error.Message) {
            this._snackBar.open(error.error.Message, undefined, {
              duration: 5 * 1000,
            });
          } else {
            this._snackBar.open(
              'Ocurrió un problema al guardar sus datos.',
              undefined,
              { duration: 5 * 1000 }
            );
          }
          this.dataArrayList = [];
          this.maskService.isLoading = false;
        }
      );
    } else {
      this._snackBar.open('No hay datos por enviar.', undefined, {
        duration: 5 * 1000,
      });
    }
  }

  closeForm() {
    this.openedForm = false;
  }

  send(): number {
    if (!this.isDateBeforeToday(this.date)) {
      this._snackBar.open(
        'No se pueden enviar datos en días posteriores al actual.',
        undefined,
        { duration: 5 * 1000 }
      );
      return 0;
    }
    this.createDataArrayList();
    this.closeForm();
    return 0;
  }

  isDateBeforeToday(dateToCheck: Date): boolean {
    const today = new Date();
    const todayNumeric = Date.parse(today.toString());
    const dateToCheckNumeric = Date.parse(dateToCheck.toString());
    return dateToCheckNumeric < todayNumeric;
  }

  onDateChange(event: any): void {
    this.clearValues();
    if (event.target.value) this.setFormValues(event.target.value);
  }

  setFormValues(date: string) {
    this.dataService.getExistingData(date).subscribe((response: any) => {
      this.date = date;
      if (response.length > 0) {
        this.periodCycle = response.find(
          (field: DataObject) => field.fieldName == 'periodCycle'
        )?.value;
        this.periodAmount = response.find(
          (field: DataObject) => field.fieldName == 'periodAmount'
        )?.value;
        this.periodColor = response.find(
          (field: DataObject) => field.fieldName == 'periodColor'
        )?.value;
        this.fluidAmount = response.find(
          (field: DataObject) => field.fieldName == 'fluidAmount'
        )?.value;
        this.fluidColor = response.find(
          (field: DataObject) => field.fieldName == 'fluidColor'
        )?.value;
        this.emotionalState = response.find(
          (field: DataObject) => field.fieldName == 'emotionalState'
        )?.value;
        this.physicalState = response.find(
          (field: DataObject) => field.fieldName == 'physicalState'
        )?.value;
        this.sleepHours = response.find(
          (field: DataObject) => field.fieldName == 'sleepHours'
        )?.value;
        this.temperature = response.find(
          (field: DataObject) => field.fieldName == 'temperature'
        )?.value;
        this.sexTimes = response.find(
          (field: DataObject) => field.fieldName == 'sexTimes'
        )?.value;
        this.emotionType = response.find(
          (field: DataObject) => field.fieldName == 'emotionType'
        )?.value;
        this.painType = response.find(
          (field: DataObject) => field.fieldName == 'painType'
        )?.value;
        console.log('this.medOpcionesChecked',response.find(
          (field: DataObject) => field.fieldName == 'medication'
        )?.value.split(','))
        this.medOpcionesChecked = response.find(
          (field: DataObject) => field.fieldName == 'medication'
        )?.value ? response.find(
          (field: DataObject) => field.fieldName == 'medication'
        )?.value.split(','): [];

      }
    });
  }

  clearValues() {
    this.periodAmount = null;
    this.periodColor = null;
    this.fluidAmount = null;
    this.fluidColor = null;
    this.emotionalState = null;
    this.physicalState = null;
    this.sleepHours = null;
    this.temperature = null;
    this.sexTimes = null;
    this.emotionType = null;
    this.painType = null;
    this.periodCycle = null;
  }
  medications: any[] = [];
  periodAverageDuration: any;
  averagePeriodVariation: any;
  nextPeriod: any;
  firstFertileDay: any;
  lastFertileDay: any;
  noFertileDays: any;
  fetchMedications() {
    this.medicineService.getMedicineByMedicine(this.medications).subscribe(
      (medications: any) => {
        this.medications = medications;
      },
      (error: any) => {
        console.error('Error fetching medications:', error);
      }
    );
  }
  medOpcionesChecked:string [] = [];

  onMedicinasClick(event: MatCheckboxChange, medication:Medicina):boolean{
    if(event.checked){
      this.medOpcionesChecked.push(medication.name)
    }else{
      let index = this.medOpcionesChecked.indexOf(medication.name);
      this.medOpcionesChecked.splice(index, 1);
    }
    console.log('\n',this.medOpcionesChecked.toString())
    console.log('\n',typeof this.medOpcionesChecked.toString())
    return true;
  }
}
