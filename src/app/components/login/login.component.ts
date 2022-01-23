import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Firestore } from '@angular/fire/firestore';
import { getAuth, RecaptchaVerifier } from 'firebase/auth';
import { signInWithPhoneNumber } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  reCaptchaVerifier: any;
  phoneNumber!: string;
  otp!: string;
  phoneSignIn: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  togglePhoneSignIn() {
    this.phoneSignIn = !this.phoneSignIn;
  }


  getOTP() {
    const auth = getAuth();
    this.reCaptchaVerifier = new RecaptchaVerifier('login-button', {'size': 'invisible'}, auth);

    signInWithPhoneNumber(auth, this.phoneNumber, this.reCaptchaVerifier);


  }

  submit() {
    //Check if the form is valid and it pass the validation (ex:Validators.email)
    if (!this.loginForm.valid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    //Login using the AuthenticationService and the method login defined in the service
    // Adding the HotToastService to display information
    // Navigate to frontpage after login

    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: "Successfully logged in :)",
          loading: "Authentication in process...",
          error: "Please check your credentials :(",
        })
      )
      .subscribe(() => {
        this.router.navigate([""]);
      });
  }
}



