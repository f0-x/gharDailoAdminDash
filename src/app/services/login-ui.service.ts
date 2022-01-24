import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUiService {
  private showPhoneSignIn: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  togglePhoneSignIn(): void {
    this.showPhoneSignIn= !this.showPhoneSignIn;
    this.subject.next(this.showPhoneSignIn);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
