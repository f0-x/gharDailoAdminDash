import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  @Output() onAddOrder: EventEmitter<Order> = new EventEmitter<Order>();
  addOrderForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addOrderForm = this.fb.group({
      client: ["", [Validators.required, Validators.minLength(3)]],
      address: ["", [Validators.required, Validators.minLength(3)]],
      date: ["", [Validators.required, Validators.minLength(3)]],
      name: ["",[Validators.required,Validators.minLength(3)]]  
    });
  }

  onSubmit() {
    const newOrder ={
      client: this.addOrderForm.value.client,
      address: this.addOrderForm.value.address,
      date: this.addOrderForm.value.date,
      name: this.addOrderForm.value.name
    };

    this.onAddOrder.emit(newOrder);
    /********Resetting the values of the form ********/
    this.addOrderForm.reset();
    /*************Resetting each field errors after submission ****/
    for(let control in this.addOrderForm.controls) {
      this.addOrderForm.controls[control].setErrors(null);
    }
  }

}
