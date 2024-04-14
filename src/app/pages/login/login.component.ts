import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { DialogPasswordResetComponent } from './dialog-password-reset/dialog-password-reset.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MaskService } from 'src/app/services/mask.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginData = {
    email: '',
    password: '',
  };

  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router,
    private matDialog: MatDialog,
    public maskService: MaskService
  ) {}

  openDialog() {
    this.matDialog.open(DialogPasswordResetComponent, {
      width: '500px',
    });
  }

  ngOnInit(): void {}

  formSubmit() {
    if (!this.loginData.email) {
      this.snack.open('El email es requerido!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    // Expresión regular para validar correos electrónicos
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    if (!emailRegex.test(this.loginData.email)) {
      this.snack.open(
        'El email no es válido. Ingresa un correo válido.',
        'Aceptar',
        {
          duration: 3000,
        }
      );
      return;
    }
    if (!this.loginData.password) {
      this.snack.open('La contraseña es requerida!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }
    this.maskService.isLoading = true;
    this.loginService.generateToken(this.loginData).subscribe(
      (response: any) => {
        this.loginService.loginUser(response.token);
        this.loginService.setUser(response.user);

        if (this.loginService.getUserRole() == 'ADMIN') {
          this.maskService.isLoading = false;
          this.router.navigate(['/admin']);
          this.loginService.loginStatusSubjec.next(true);
        } else if (this.loginService.getUserRole() == 'USER') {
          this.maskService.isLoading = false;
          this.router.navigate(['/user-dashboard']);
          this.loginService.loginStatusSubjec.next(true);
        }
      },
      (error) => {
        console.log(error);
        this.maskService.isLoading = false;
        Swal.fire({
          title: 'Credenciales inválidos',
          text: 'Lo sentimos, no pudimos procesar tus credenciales en este momento. Por favor, inténtalo de nuevo más tarde o comunícate con el soporte técnico si el problema persiste.',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'pink',
        }).then((result) => {
          if (result.isConfirmed) {
            // El usuario hizo clic en "Aceptar"
          }
        });
      }
    );
  }
}
