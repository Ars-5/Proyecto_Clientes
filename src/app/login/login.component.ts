import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router) { }

  onLoginSuccess() {
    // Aquí va el código para verificar las credenciales del usuario

    // Si las credenciales son correctas, navega a AppComponent
    let navigationExtras: NavigationExtras = {
       skipLocationChange: true,
       replaceUrl: true
    };

    this.router.navigate(['/'], navigationExtras);
   }
}
