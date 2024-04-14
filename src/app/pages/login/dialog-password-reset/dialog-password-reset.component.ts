import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaskService } from 'src/app/services/mask.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-password-reset',
  templateUrl: './dialog-password-reset.component.html',
  styleUrls: ['./dialog-password-reset.component.scss'],
})
export class DialogPasswordResetComponent implements OnInit {
  dialogEmail = {
    email: '',
  };

  constructor(
    private snack: MatSnackBar,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog,
    private maskService: MaskService
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    if (
      this.dialogEmail.email.trim() == '' ||
      this.dialogEmail.email.trim() == null
    ) {
      this.snack.open('El email es requerido!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!emailRegex.test(this.dialogEmail.email)) {
      this.snack.open(
        'El email no es válido. Ingresa un correo válido.',
        'Aceptar',
        {
          duration: 3000,
        }
      );
      return;
    }
    this.maskService.isLoading = true;
    this.userService
      .reiniciarContraseña(this.dialogEmail)
      .subscribe((response) => {
        Swal.fire(
          'Revisar Correo',
          'Se ha enviado un código de restablecimiento de contraseña a su dirección de correo electrónico. '
        );
        this.maskService.isLoading = false;
        Swal.fire({
          title: 'Revisar Correo',
          text: 'Se ha enviado un código de restablecimiento de contraseña a su dirección de correo electrónico.',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#FF69B4',
        }).then((result) => {
          if (result.isConfirmed) {
            // El usuario hizo clic en "Aceptar"
            this.dialog.closeAll();
            this.router.navigate(['/']);
          }
        });
      });
  }
}
