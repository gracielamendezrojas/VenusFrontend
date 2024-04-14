import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import { FormsModule } from '@angular/forms';
import {MedicineService} from "../../../services/medicine.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-editar-medicina',
  templateUrl: 'modal-editar-medicina.component.html',
  styleUrls: ['./modal-editar-medicina.component.scss'],
})
export class ModalEditarMedicinaComponent implements OnInit{

  public medicina={
    medicine_id: 0,
    name:'',
    dosis:'',
    frecuencia:'',
  }

  public nuevaDosis01:string = "nuevadosisprueba"
  //
  // public medicine_id: number;
  // public name: string ;
  // public dosis: string;
  // public frecuencia: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialogRef: MatDialogRef<ModalEditarMedicinaComponent>,  private medServervice: MedicineService) {
    this.medicina.medicine_id = data.medicine_id;
    this.medicina.name = data.name;
    this.medicina.dosis = data.dosis;
    this.medicina.frecuencia = data.frecuencia;
  }

  // public medicina = {
  //   medicine_id: 0,
  //   name: '',
  //   dosis:'',
  //   frecuencia:''
  // }

  frecuencias: string[] = [];
  anadeFrecuencias(){
    this.frecuencias.push('Una dosis diaria')
    this.frecuencias.push('Dos dosis diarias')
    this.frecuencias.push('Tres dosis diarias')
    this.frecuencias.push('Una dosis semanal')
    this.frecuencias.push('Una dosis mensual')
    this.frecuencias.push('Indefinida')
  }

  ngOnInit(): void {
    this.anadeFrecuencias()
  }

  formSubmit() {
    console.log('form submitted');
    console.log('name', this.medicina.name);
    console.log('dosis', this.medicina.dosis);
    console.log('frecuencia', this.medicina.frecuencia);

    if(this.medicina.name === ''|| this.medicina.name === ' ' || this.medicina.name === null
        || this.medicina.dosis === '' || this.medicina.dosis === ' '|| this.medicina.dosis === null
      || this.medicina.frecuencia === '' || this.medicina.frecuencia === ' '|| this.medicina.frecuencia === null
    ){
      Swal.fire({
        title: 'Todos los campos son obligatorios',
        text: 'Favor llenar todos los campos.',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'pink',
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Aceptar"
        }
      });
    }else{
      this.medServervice.modificaMedicina(this.medicina, this.medicina.medicine_id).subscribe((response:any) => {
        console.log('response ', response)
        Swal.fire({
          title: 'Medicina modificada',
          text: 'Medicina modificada con éxito.',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'pink',
        }).then((result) => {
          if (result.isConfirmed) {
            // El usuario hizo clic en "Aceptar"
          }
        });
        const dataToSendBack = this.medicina;
        this.dialogRef.close(dataToSendBack);

      })
    }




  }

}

