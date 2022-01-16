import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { from } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password).then((result) => {
      localStorage.setItem('user',JSON.stringify(this.auth.currentUser))
    }));
  }

  logout() {
    return from(this.auth.signOut().then((result)=>{
      localStorage.removeItem('user')
    }));
  }

}