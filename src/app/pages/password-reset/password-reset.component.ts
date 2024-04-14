import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit {
  passwordReset = {
    newPassword: '',
    repeatPassword: '',
    userCode: '',
  };

  constructor(
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.passwordReset.userCode = params['userCode'];
    });
  }

  formSubmit() {
    console.log(this.passwordReset.newPassword)
    console.log(this.passwordReset.repeatPassword)
    if (!this.passwordReset.newPassword) {
      this.snack.open('La nueva contraseña es requerida!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }
    if (!this.passwordReset.repeatPassword) {
      this.snack.open('Debe repetir la nueva contraseña!', 'Aceptar', {
        duration: 3000,
      });
      return;
    }

    if (
      this.passwordReset.newPassword.trim() != 
      this.passwordReset.repeatPassword.trim() 
    ) {
      this.snack.open('Las contraseñas son distintas', 'Aceptar', {
        duration: 3000,
      });
      return;
    }
    if(!this.passwordValidation(this.passwordReset.newPassword)){
      Swal.fire({
        title: 'Contraseña inválida',
        text: 'La contraseña debe ser de mínimo 8 caracteres, debe contener una mayúscula, una minúscula, un número y un caracter especial.',
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'pink',
      });
      const passwordInput1 = document.getElementsByName("newPassword")[0] as HTMLInputElement;
      const passwordInput2 = document.getElementsByName("repeatPassword")[0] as HTMLInputElement;
      passwordInput1.value = '';
      passwordInput2.value = '';
      return;
    }
    
    this.userService.changePassword(this.passwordReset).subscribe(
      (response) => {
        Swal.fire({
          title: 'Cambio de contraseña',
          text: 'Su contraseña ha sido cambiada exitosamente!',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: 'pink',
        }).then((result) => {
          if (result.isConfirmed) {
            this.dialog.closeAll();
            this.router.navigate(['/']);
          }
        });
      },
      (error) => {
        if (error.status === 500) {
          Swal.fire({
            title: 'Error del servidor',
            text: 'Ha ocurrido un error en el servidor. Por favor, inténtalo más tarde.',
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'pink',
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialog.closeAll();
            }
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.',
            icon: 'error',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'pink',
          }).then((result) => {
            if (result.isConfirmed) {
              this.dialog.closeAll();
              this.router.navigate(['/']);
            }
          });
        }
      }
    );
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
}
