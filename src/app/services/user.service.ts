import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth'
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private auth: Auth) {}

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: { email: string, password: string }): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(response => {
        // Puedes realizar acciones adicionales después del registro si es necesario
        console.log('Registro exitoso', response);
        return response;
      })
      .catch(error => {
        // Manejar errores de registro
        console.error('Error durante el registro', error);
        throw error; // Lanza el error para que el componente pueda manejarlo
      });
  }


  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

}
