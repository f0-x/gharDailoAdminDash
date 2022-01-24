import { Component, OnInit, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app'
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  otp!: string;
  verify: any;

  constructor(private router: Router,
             private ngZone: NgZone,
             private afAuth: AngularFireAuth,
             ) { }
    config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  ngOnInit(): void {
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');
    console.log(this.verify);
  }

  onOtpChange(otp: string){
    this.otp = otp;
  }

  handleClick() {
    console.log(this.otp);
    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );
    console.log(credential);
    this.afAuth.signInWithCredential(credential)
/*     firebase.auth().signInWithCredential(credential) */
    .then((response) => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response));
      this.ngZone.run(()=> {
        this.router.navigate(['']);
      });
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    })

  }

}
