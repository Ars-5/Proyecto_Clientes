import { Component,  EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formReg: FormGroup;
  formLogin: FormGroup;
  hide = true;

  constructor(private router: Router, private el: ElementRef,
    private renderer: Renderer2, private userService: UserService,
    private toastr: ToastrService) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })
  }



  loginUser() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        this.router.navigate(['/home']);
        console.log(response);
        this.toastr.success('Se inicio sesion correctamente', 'Inicio correcto')
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          this.toastr.error('Correo electrónico inválido', 'Error de inicio de sesión');
        } else if (error.code === 'auth/invalid-credential') {
          this.toastr.error('Contraseña inválida', 'Error de inicio de sesión');
        } else if (error.code === 'auth/wrong-password') {
          this.toastr.error('Contraseña incorrecta', 'Error de inicio de sesión');
        } else if (error.code === 'auth/user-not-found') {
          this.toastr.error('Usuario no encontrado', 'Error de inicio de sesión');
        } else {
          this.toastr.error('Error desconocido', 'Error de inicio de sesión');
          console.error('Error no manejado:', error);
        }
      });
  }


  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['/home']);
        Swal.fire('Éxito', 'Se registro correctamente', 'success');
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          this.toastr.error('Correo electrónico inválido', 'Error en el registro');
        } else if (error.code === 'auth/weak-password') {
          this.toastr.error('Contraseña invalida / debil', 'Error en el registro');
        } else if (error.code === 'auth/auth/missing-password') {
          this.toastr.error('Contraseña faltante', 'Error en el registro');
        }  else if (error.code === 'auth/user-not-found') {
          this.toastr.error('Usuario no encontrado', 'Error en el registro');
        } else {
          this.toastr.error('Error desconocido', 'Error en el registro');
          console.error('Error no manejado:', error);
        }
      });
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.router.navigate(['/home']);
        this.toastr.success('Se inicio sesion correctamente', 'Inicio correcto')
      })
      .catch(error => console.log(error))
  }

  //animaciones
  register() {
    const x = this.el.nativeElement.querySelector('#login');
    const y = this.el.nativeElement.querySelector('#register');
    const z = this.el.nativeElement.querySelector('#btn');
    this.modifyStyles(x, y, z, '-400px', '50px', '110px');
  }

  login() {
    const x = this.el.nativeElement.querySelector('#login');
    const y = this.el.nativeElement.querySelector('#register');
    const z = this.el.nativeElement.querySelector('#btn');

    this.modifyStyles(x, y, z, '50px', '450px', '0');
  }

  private modifyStyles(x: HTMLElement, y: HTMLElement, z: HTMLElement, leftX: string, leftY: string, leftZ: string): void {
    this.renderer.setStyle(x, 'left', leftX);
    this.renderer.setStyle(y, 'left', leftY);
    this.renderer.setStyle(z, 'left', leftZ);
  }



}
