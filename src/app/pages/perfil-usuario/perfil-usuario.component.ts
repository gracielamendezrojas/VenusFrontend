import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ThemePalette } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { LoginService } from '../../services/login.service';
import { ResetContraRequestBody } from '../../interface/ResetContraRequestBody';
import { PreferenciasPostBody } from '../../interface/PreferenciasPostBody';
import { MedicineService } from 'src/app/services/medicine.service';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {Medicina} from "../../interface/Medicina";
import {TextComponent} from "../../components/text/text.component";
import {NotificationService} from "../../services/notifications.service";
import {
  MatDialog, MatDialogModule,
} from '@angular/material/dialog';
import {ModalEditarMedicinaComponent} from "./modal-editar-medicina/modal-editar-medicina.component";
import { MaskService } from 'src/app/services/mask.service';
import {FrecuenciasPostBody} from "../../interface/FrecuenciasPostBody";
import {MatTooltipModule} from '@angular/material/tooltip';
export interface Task {
  name: string;
  value: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
}

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCheckboxModule,
    CommonModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    TextComponent,
    MatTooltipModule,
  ],
})
export class PerfilUsuarioComponent implements OnInit {
  public editar: boolean = false;
  public body?: ResetContraRequestBody;

  public user = {
    name: '',
    surname: '',
    email: '',
    password: '',
    phone: '',
  };

  private user1 = this.loginService.getUser();
  public medicinas: Medicina[] = [];


  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private snack: MatSnackBar,
    private maskService: MaskService,
    private medicineService: MedicineService,
    public dialog: MatDialog,
    private notitificationService: NotificationService
  ) {}



  ngOnInit(): void {
    this.user.name = this.user1.name;
    this.user.surname = '';
    this.user.email = this.user1.email;
    this.user.password = '';
    this.user.phone = this.user1.phone;

    this.cargarPreferenciasActuales();
    this.anadeFrecuencias();
    this.anadeFrecuenciasNotificaciones()
    this.getAllMedicinasFiltered();
  }

  onEditar(clickEvent: any) {
    this.editar = true;
    clickEvent.stopPropagation();
  }

  onEditarOff() {
    this.editar = false;
  }

  onSalvarCambios(clickEvent: any) {
    this.maskService.isLoading = true;
    this.userService.actualizarUsuario(this.user).subscribe(
      (response) => {
       this.maskService.isLoading = false;
    },(error) => this.maskService.isLoading = false);
    // Handle the "Salvar Cambios" button click
    //clickEvent.stopPropagation();
  }

  onCancelar(clickEvent: any) {
    this.editar = false;
    clickEvent.stopPropagation();
  }

  //DATOS DE USUARIO

  //REESTABLECER CONTRASENA

  currenPasswordMatch: boolean = false;

  clearFields(): void {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  passwordValidation(password:any){
    const regexLongitud = /.{8,}/;
    const regexMinuscula = /[a-z]/;
    const regexMayuscula = /[A-Z]/;
    const regexNumero = /\d/;
    const regexEspecial = /[!@#$%^&*(),.?":{}|<>]/;

    const isLong = regexLongitud.test(password);
    const isMinus = regexMinuscula.test(password);
    const isUpper = regexMayuscula.test(password);
    const isNum = regexNumero.test(password);
    const isSpecial = regexEspecial.test(password);

    if(isLong && isMinus && isUpper && isNum && isSpecial){
      return true
    }else{
      return false;
    }
  }

  confirmaContraActual(event: any) {
    this.body = { string: this.currentPassword, email: this.user.email };
  }

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  resetPassword() {
    this.body = { string: this.currentPassword, email: this.user.email };

    if (
      this.newPassword === '' ||
      this.newPassword === null ||
      this.confirmPassword === '' ||
      this.confirmPassword === null ||
      this.currentPassword === '' ||
      this.currentPassword === null
    ) {
      Swal.fire({
        title: 'Todos los campos son requeridos',
        text: 'Favor digitar la información requerida',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'pink',
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Aceptar"
        }
      });
      this.clearFields();
      return;
    }
    if(!this.passwordValidation(this.newPassword)){
      Swal.fire({
        title: 'Contraseña inválida',
        text: 'La contraseña debe ser de mínimo 8 caracteres, debe contener una mayúscula, una minúscula, un número y un caracter especial.',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'pink',
      });
      const passwordInput = document.getElementsByName("password")[0] as HTMLInputElement;
      passwordInput.value = '';
      return;
    }
    this.maskService.isLoading = true;
    this.userService.compara(this.body).subscribe(
      (response: any) => {
        if (response) {
          if (this.newPassword === this.confirmPassword) {
            this.user.password = this.confirmPassword;
            this.userService
              .actualizarUsuario(this.user)
              .subscribe((response) => {
                this.maskService.isLoading = false;
                Swal.fire({
                  title: 'Usuario actualizado',
                  text: 'Usuario actualizado con éxito.',
                  showCancelButton: false,
                  showConfirmButton: true,
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: 'pink',
                }).then((result) => {
                  if (result.isConfirmed) {
                    // El usuario hizo clic en "Aceptar"
                  }
                });
              });
            this.clearFields();
          } else {
            this.maskService.isLoading = false;
            Swal.fire({
              title: 'Contraseñas no concuerdan',
              text: 'Verificar nueva contraseña en ambos campos.',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: 'pink',
            }).then((result) => {
              if (result.isConfirmed) {
                // El usuario hizo clic en "Aceptar"
              }
            });
            this.clearFields();
            return;
          }
        } else {
          Swal.fire({
            title: 'Error en contraseña actual',
            text: 'Favor verificar la contraseña actual',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'pink',
          }).then((result) => {
            if (result.isConfirmed) {
              // El usuario hizo clic en "Aceptar"
            }
          });
          this.clearFields();
          this.maskService.isLoading = false;
          return;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  formSubmit(clickEvent: any) {

    if (
      !this.user.name ||
      !this.user.email ||
      !this.user.phone
    ) {
      Swal.fire({
        title: 'Todos los campos son requeridos',
        text: 'Favor digitar la información requerida',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'pink',
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Aceptar"
        }
      });
      this.clearFields();
      return;
    }

    if (
      this.user.name === this.user1.name && this.user.email === this.user1.email && this.user.phone === this.user1.phone
    ) {
      Swal.fire({
        title: 'Valores iguales',
        text: 'Favor actualizar información',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'pink',
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Aceptar"
        }
      });
      this.clearFields();
      return;
    }

    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!emailRegex.test(this.user.email)) {
      Swal.fire({
        title: 'Error con el correo electrónico',
        text: 'Correo electrónico debe estar en formato de correo',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'pink',
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Aceptar"
        }
      });
      this.clearFields();
      return;
    }

    this.maskService.isLoading = true;
    this.userService.actualizarUsuario(this.user).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'Usuario actualizado',
          text: 'Usuario actualizado con éxito.',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'pink',
        }).then((result) => {
          if (result.isConfirmed) {
            // El usuario hizo clic en "Aceptar"
          }
        });
        this.user1.name = this.user.name;
        this.user1.email = this.user.email;
        this.user1.phone = this.user.phone;
        this.onEditarOff()
        this.maskService.isLoading = false;
        localStorage.setItem("user",JSON.stringify(this.user));
      },
      (error: any) => {
        console.log('Error actualizar', error);
        if (error.status === 400) {
          // Error de credenciales incorrectos (Código de respuesta 400)
          this.snack.open(
            'Este correo ya esta en uso, por favor utilice otro',
            'Aceptar',
            {
              duration: 3000,
            }
          );
        } else {
          // Error del sistema u otro tipo de error
          this.snack.open('Ha ocurrido un error en el sistema.', 'Aceptar', {
            duration: 3000,
          });
        }
        this.maskService.isLoading = false;
      }
    );
  }

  // PREFERENCIAS

  task: Task = {
    name: 'Seleccionar todas',
    value: 'todas',
    completed: false,
    color: 'primary',
    subtasks: [
      {
        name: 'Mensaje de texto SMS',
        value: 'sms',
        completed: false,
        color: 'primary',
      },
      {
        name: 'Mensaje de Whatsapp',
        value: 'wapp',
        completed: false,
        color: 'primary',
      },
      {
        name: 'Correo electrónico',
        value: 'email',
        completed: false,
        color: 'primary',
      },
    ],
  };

  allComplete: boolean = false;


  cargarPreferenciasActuales(){
    this.maskService.isLoading = true;
    this.userService.getPreferenciasByEmail(this.user1.email).subscribe(
      (response:any) => {
        console.log("preferencias response", response)
        this.task.subtasks?.forEach((task) => {
          if(task.value === 'sms' && response.sms === '1'){
            task.completed = true;
          }
          if(task.value === 'wapp' && response.wapp === '1'){
            task.completed = true;
          }
          if(task.value === 'email' && response.email === '1'){
            task.completed = true;
          }
        })

        if(response.anticipation_notice === 0){
          this.formFrecuenciaNotificacion = 'Mismo día de pronóstico';
        }
        if(response.anticipation_notice === 1){
          this.formFrecuenciaNotificacion = '1 día antes';
        }
        if(response.anticipation_notice === 3){
          this.formFrecuenciaNotificacion = '3 días antes';
        }
        if(response.anticipation_notice === 7){
          this.formFrecuenciaNotificacion = '1 semana antes';
        }
        if(response.anticipation_notice === 14){
          this.formFrecuenciaNotificacion = '2 semanas antes';
        }
        this.maskService.isLoading = false;
      }, (error) => {
        console.error("error: ", error);
        this.maskService.isLoading = false;
      }
    )
  }

  //cargarPreferenciasActuales();


  /*
  * updateAllComplete() es un método que calcula el valor de allComplete en función del estado de finalización de las subtareas:
    Comprueba si la propiedad de subtareas del objeto de tarea no es nula.
    Si las subtareas no son nulas, utiliza el método every para verificar si todas las subtareas tienen su propiedad completada establecida en true. Si lo hacen, establece this.allComplete en true;sino en false.*/
  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((task) => task.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((task) => task.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((task) => (task.completed = completed));
  }

  wappSelected: string = '0';
  smsSelected: string = '0';
  emailSelected: string = '0';
  prefBody: PreferenciasPostBody;
  isOptionSelected(subtask: any): boolean {
    return subtask.completed;
  }

  salvarOpciones(): void {
    // @ts-ignore
    if (this.task.subtasks[0].completed) {
      this.smsSelected = '1';
    } else {
      this.smsSelected = '0';
    }
    // @ts-ignore
    if (this.task.subtasks[1].completed) {
      this.wappSelected = '1';
    } else {
      this.wappSelected = '0';
    }
    // @ts-ignore
    if (this.task.subtasks[2].completed) {
      this.emailSelected = '1';
    } else {
      this.emailSelected = '0';
    }

    this.prefBody = {
      emailId: this.user.email,
      sms: this.smsSelected,
      wapp: this.wappSelected,
      email: this.emailSelected,
    };


    this.maskService.isLoading = true;
    this.userService.addPreferencia(this.prefBody).subscribe(
      (response: any) => {
        console.log('userService.addPreferencia ', response);
        this.maskService.isLoading = false;
      },
      (error: any) => {
        console.error('userService.addPreferencia ', error);
        this.maskService.isLoading = false;
      }
    );
  }

  formDosis: string = '';
  formFrecuencia: string = '';
  formName: string = '';
  formFrecuenciaNotificacion: string = '';

  printToConsole(event: any) {
    console.log(event.target.value);
  }
  onSeleccionMedicamento(event: any) {}
  public medicine = {
    name: '',
    frecuencia: '',
    dosis: '',
  };

  limpiarCampos(){
    this.formName = '';
    this.formFrecuencia = '';
    this.formDosis = '';
  }
  salvarMedicamento() {
    this.medicine.name = this.formName;
    this.medicine.frecuencia = this.formFrecuencia;
    this.medicine.dosis = this.formDosis;

    if(this.formName === '' || this.formName === ' ' || this.formName === null ||
       this.formFrecuencia === '' || this.formFrecuencia === ' ' || this.formFrecuencia === null ||
       this.formDosis === '' || this.formDosis === ' ' || this.formDosis === null
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
          this.formName = '';
          this.formFrecuencia = '';
          this.formDosis = '';
        }
      });
      this.limpiarCampos();
      return;
    }

    // if(isNaN(parseInt(this.medicine.frecuencia.trim(), 10))){
    //
    //   Swal.fire({
    //     title: 'Error de datos',
    //     text: 'Frecuencia debe ser un valor numerico.',
    //     showCancelButton: false,
    //     showConfirmButton: true,
    //     confirmButtonText: 'Aceptar',
    //     confirmButtonColor: 'pink',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       // El usuario hizo clic en "Aceptar"
    //       this.formName = '';
    //       this.formFrecuencia = '';
    //       this.formDosis = '';
    //     }
    //   });
    //   this.limpiarCampos();
    //   return;
    // }

    this.maskService.isLoading = true;
    this.medicineService.saveMedicine(this.medicine).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'Medicamento Agregado',
          text: 'Medicamento Agregado con éxito.',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'pink',
        }).then((result) => {
          if (result.isConfirmed) {
            // El usuario hizo clic en "Aceptar"
            this.formName = '';
            this.formFrecuencia = '';
            this.formDosis = '';
          }
        });
        this.getAllMedicinasFiltered();
        this.maskService.isLoading = false;
      },
      (error: any) => {
        console.log('Error agregar medicamento', error);
        if (error.status === 400) {
          // Error de credenciales incorrectos (Código de respuesta 400)
          this.snack.open(
            'Error ',
            'Aceptar',
            {
              duration: 3000,
            }
          );
        } else {
          // Error del sistema u otro tipo de error
          this.snack.open('Ha ocurrido un error en el sistema.', 'Aceptar', {
            duration: 3000,
          });
        }
        this.maskService.isLoading = false;
      }
    );
  }

  editarMedicamento(medicine_id: number){
  let foundMedicina = this.medicinas.find((med) => med.medicine_id === medicine_id);

    if (foundMedicina) {
      console.info("Editar medicina encontrada")
    } else {
      console.error('Medicina no encontrada');
    }

    this.dialog.open(ModalEditarMedicinaComponent, {
      data: {
        medicine_id: medicine_id,
        name:foundMedicina?.name,
        dosis:foundMedicina?.dosis,
        frecuencia:foundMedicina?.frecuencia
      }
    });

    this.dialog.afterAllClosed.subscribe(result => {
      this.getAllMedicinasFiltered();
    })
  }


  borrarMedicamento(medicine_id: number) {
    console.log('borrar');
    this.medicineService.borrarMed(medicine_id).subscribe((response) => {
      this.getAllMedicinasFiltered();
      console.log('borrar ', response.toString());
      Swal.fire({
        title: 'Medicamento borrado',
        text: 'Medicamento eliminado con éxito',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'pink',
      }).then((result) => {
        if (result.isConfirmed) {
          // El usuario hizo clic en "Aceptar"
        }
      });
    });
  }


  frecuencias: string[] = [];
  anadeFrecuencias(){
    this.frecuencias.push('Una dosis diaria')
    this.frecuencias.push('Dos dosis diarias')
    this.frecuencias.push('Tres dosis diarias')
    this.frecuencias.push('Una dosis semanal')
    this.frecuencias.push('Una dosis mensual')
    this.frecuencias.push('Indefinida')
  }

  frecuenciasNotificaciones: string[] = [];
  anadeFrecuenciasNotificaciones(){
    this.frecuenciasNotificaciones.push('1 día antes')
    this.frecuenciasNotificaciones.push('3 días antes')
    this.frecuenciasNotificaciones.push('1 semana antes')
    this.frecuenciasNotificaciones.push('2 semanas antes')
  }


  getAllMedicinasFiltered(){
    console.log('medicinas')
    this.medicineService.getAllMedicamentos().subscribe((response: Medicina[]) => {
      this.medicinas = response;
    })
  }

  sendNextPeriodSMS() {
    this.maskService.isLoading = true;
    this.notitificationService.sendNextPeriodSMS().subscribe(
      (data: any) => {
        if(data.result === "Debe ajustar sus preferencias de notificaciones, para recibir mensajes de texto."){
          this.snack.open('Debe ajustar sus preferencias de notificaciones para recibir mensajes de texto.', 'Aceptar', {
            duration: 3000,
          });
        }
        if(data.result !== "Debe ajustar sus preferencias de notificaciones, para recibir mensajes de texto."){
          this.snack.open('El mensaje fue enviado al número registrado en el perfil.', 'Aceptar', {
            duration: 3000,
          });
        }
        this.maskService.isLoading = false;
      },
      (error: any) => {
        console.log(error);
        this.snack.open('Hubo un error, no se pudo llevar a cabo su solicitud.', 'Aceptar', {
          duration: 3000,
        });
        this.maskService.isLoading = false;
      }
    );
  }

  sendNextFertileDaysSMS() {
    this.maskService.isLoading = true;
    this.notitificationService.sendNextFertileDaysSMS().subscribe(
      (data: any) => {
        if(data.result === "Debe ajustar sus preferencias de notificaciones, para recibir mensajes de texto."){
          this.snack.open('Debe ajustar sus preferencias de notificaciones para recibir mensajes de texto.', 'Aceptar', {
            duration: 3000,
          });
        }
        if(data.result !== "Debe ajustar sus preferencias de notificaciones, para recibir mensajes de texto."){
          this.snack.open('El mensaje fue enviado al número registrado en el perfil.', 'Aceptar', {
            duration: 3000,
          });
        }
        this.maskService.isLoading = false;
      },
      (error: any) => {
        console.log(error);
        this.snack.open('Hubo un error, no se pudo llevar a cabo su solicitud.', 'Aceptar', {
          duration: 3000,
        });
        this.maskService.isLoading = false;
      }
    );
  }


  sendNextPeriodWA() {
    this.maskService.isLoading = true;
    this.notitificationService.sendNextPeriodWA().subscribe(
      (data: any) => {
        if(data.result === "noWAPreferenceOn"){
          this.snack.open('Debe ajustar sus preferencias de notificaciones para recibir mensajes de WhatsApp.', 'Aceptar', {
            duration: 3000,
          });
        }
        if(data.result !== "noWAPreferenceOn"){
          this.snack.open('El mensaje fue enviado al número registrado en el perfil.', 'Aceptar', {
            duration: 3000,
          });
        }
        this.maskService.isLoading = false;
      },
      (error: any) => {
        console.log(error);
        this.snack.open('Hubo un error, no se pudo llevar a cabo su solicitud.', 'Aceptar', {
          duration: 3000,
        });
        this.maskService.isLoading = false;
      }
    );
  }

  sendNextFertileDaysWA() {
    this.maskService.isLoading = true;
    this.notitificationService.sendNextFertileDaysWA().subscribe(
      (data: any) => {
        if(data.result === "noWAPreferenceOn"){
          this.snack.open('Debe ajustar sus preferencias de notificaciones para recibir mensajes de WhatsApp.', 'Aceptar', {
            duration: 3000,
          });
        }
        if(data.result !== "noWAPreferenceOn"){
          this.snack.open('El mensaje fue enviado al número registrado en el perfil.', 'Aceptar', {
            duration: 3000,
          });
        }
        this.maskService.isLoading = false;
      },
      (error: any) => {
        console.log(error);
        this.snack.open('Hubo un error, no se pudo llevar a cabo su solicitud.', 'Aceptar', {
          duration: 3000,
        });
        this.maskService.isLoading = false;
      }
    );
  }

  sendMonthlyReport(){
    this.maskService.isLoading = true;
    this.notitificationService.sendMonthlyReport().subscribe({
      next: (response) => {
        this.snack.open('Reporte enviado al correo.', 'Aceptar', {
          duration: 3000,
        });
        this.maskService.isLoading = false;
      },
      error: (error)=>{
        if(error.error.message.includes('preferencias')){
          this.snack.open(error.error.message, 'Aceptar', {
            duration: 3000,
          });
          this.maskService.isLoading = false;
          return;
        }
        this.snack.open('Ocurrió un error enviando el reporte, por favor contactar a soporte técnico.', 'Aceptar', {
          duration: 3000,
        });
        this.maskService.isLoading = false;
      }
    });
  }

  salvarOpcionesFrecuecia() {
    let frecuenciaSeleccionada = this.formFrecuenciaNotificacion;
    console.log('salvarOpcionesFrecuecia()')
    if(this.formFrecuenciaNotificacion === '' || this.formFrecuenciaNotificacion === ' ' || this.formFrecuenciaNotificacion === null){
      console.log('frecuenciaSeleccionada ', frecuenciaSeleccionada)

      Swal.fire({
        title: 'Todos los campos son obligatorios',
        text: 'Favor seleccionar frecuencia de notificación.',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'pink',
      }).then((result) => {
        return;
      });
    }// if


    let anticipationNoticeBody:FrecuenciasPostBody = {
      anticipation_notice : 0,
      emailId: this.user.email
    }

    if(frecuenciaSeleccionada === 'Mismo día de pronóstico'){
      anticipationNoticeBody.anticipation_notice = 0;
    }
    if(frecuenciaSeleccionada === '1 día antes'){
      anticipationNoticeBody.anticipation_notice = 1;
    }
    if(frecuenciaSeleccionada === '3 días antes'){
      anticipationNoticeBody.anticipation_notice = 3;
    }
    if(frecuenciaSeleccionada === '1 semana antes'){
      anticipationNoticeBody.anticipation_notice = 7;
    }
    if(frecuenciaSeleccionada === '2 semanas antes'){
      anticipationNoticeBody.anticipation_notice = 14;
    }

    console.log('anticipationNoticeBody.anticipation_notice ', anticipationNoticeBody.anticipation_notice)
    this.maskService.isLoading = true;
    this.userService.actualizaFrecuencia(anticipationNoticeBody).subscribe(
      (response: any) => {
        console.log('this.userService.actualizaFrecuencia ', response);
        this.maskService.isLoading = false;
      },
      (error: any) => {
        console.error('userService.addPreferencia ', error);

      }
    );



  }//salvar
}
