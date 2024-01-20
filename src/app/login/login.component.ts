import { Component,  EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavigationExtras } from '@angular/router';

import { ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formReg: FormGroup;
  hide = true;

  constructor(private router: Router, private el: ElementRef, private renderer: Renderer2, ) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })
  }



  loginUser(){
    this.router.navigate(['/home']);
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
