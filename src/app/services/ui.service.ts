import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddUser: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleAddUser(): void {
    this.showAddUser = !this.showAddUser;
    this.subject.next(this.showAddUser);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }
}
