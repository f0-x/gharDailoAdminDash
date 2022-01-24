import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthService } from 'src/app/services/auth.service';
import { WindowService } from 'src/app/services/window.service';
import { RecaptchaVerifier, getAuth, UserCredential } from 'firebase/auth';
import { LoginUiService } from 'src/app/services/login-ui.service';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.css']
})
export class PhoneLoginComponent implements OnInit, AfterViewInit {
  windowRef: any;
  phoneNumber!: string;
  otp!: string;
  disableOTPSendButton: boolean = true;

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private windowService: WindowService,
    private loginUiService: LoginUiService,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.windowRef = this.windowService.windowRef;
  }

  ngAfterViewInit(): void {
    const auth = getAuth();
    this.windowRef.reCaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': (response: Response) => {
        this.disableOTPSendButton = false;
      }
    }, auth);
    this.windowRef.reCaptchaVerifier.render();
  }

  sendOTP(){
    this.afAuth.signInWithPhoneNumber(this.phoneNumber, this.windowRef.reCaptchaVerifier).then((confirmationResult) => {
/*       this.windowRef.confirmationResult = confirmationResult; */

        localStorage.setItem(
          'verificationId',
          JSON.stringify(confirmationResult.verificationId)
        );
        this.ngZone.run(() => {
          this.router.navigate(['/otp']);
        });
    })
    .catch((error) => {
      console.log(error.message);
      alert(error.message);
      setTimeout(()=>{
        window.location.reload();
      }, 5000);
    })
  }

/*   verifyOTP(){
    this.windowRef.confirmationResult.confirm(this.otp)
    .then((userCredentials: UserCredential) => console.log(userCredentials));
  } */

  togglePhoneSignIn() {
    this.loginUiService.togglePhoneSignIn();
  }

}
