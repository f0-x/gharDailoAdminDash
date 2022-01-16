import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output()
  onAddUser: EventEmitter<User> = new EventEmitter<User>();

  addUserForm: FormGroup = new FormGroup({});
  showAddUser: boolean = false;

  alertSuccess = false;
  alertFailed = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addUserForm = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(10)]],
      email: ["", [Validators.email, Validators.required]],
      role: ["", Validators.required],
      balance: [null,[ Validators.min(1), Validators.max(100000), Validators.required]]
    });
  }

  //Using <ngb-alert> instead of HotToastService, with ngIf and boolean values.

  onSubmit() {
    if (!this.addUserForm.value.name) {
      this.alertFailed = true;
      setTimeout(() => {
        this.alertFailed = false; 
      }, 2000);
      return;
    }
    const newUser = {
      name: this.addUserForm.value.name,
      email: this.addUserForm.value.email,
      role: this.addUserForm.value.role,
      balance: this.addUserForm.value.balance
    };
    // Emitting the new user using EventEmitter
    // takes the event and uses it in the method
    // addUserToFirebase($event)
    // from user.component.ts

    this.onAddUser.emit(newUser);

    // Reset the form and the errors
    this.addUserForm.reset();
    for (let control in this.addUserForm.controls) {
      this.addUserForm.controls[control].setErrors(null);
    }
    this.alertSuccess = true;
    setTimeout(() => {
      this.alertSuccess = false; 
    }, 2000);
  }
}
