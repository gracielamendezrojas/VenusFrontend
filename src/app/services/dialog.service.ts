import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogDataComponent } from '../components/dialog-data/dialog-data.component';
import { PeriodData } from '../interface/period-data';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DialogService {
  private selectedDataSubject = new BehaviorSubject<PeriodData | null>(null);
  selectedData$ = this.selectedDataSubject.asObservable();

  constructor(private dialog: MatDialog) {}

  openDialog(data: PeriodData): void {
    this.selectedDataSubject.next(data); // Envía los datos al BehaviorSubject
    const dialogRef = this.dialog.open(DialogDataComponent, {
      width: '700px',
    });
  }

  closeDialog(): void {
    // Cierra el diálogo abierto si existe uno
    this.dialog.closeAll();
  }
}
