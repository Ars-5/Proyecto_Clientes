import { Component,  EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<boolean>();
  login: any;
  constructor(private router: Router) { }



   loginUser() {
    // ... Lógica de inicio de sesión exitosa ...

    // Emitir el evento de éxito de inicio de sesión
    this.router.navigate(['/home']);
    this.loginSuccess.emit(true);
  }


}
