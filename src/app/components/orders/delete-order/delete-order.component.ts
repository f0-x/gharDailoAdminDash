import { Component, Inject, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/interfaces/order';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-order',
  templateUrl: './delete-order.component.html',
  styleUrls: ['./delete-order.component.css']
})
export class DeleteOrderComponent implements OnInit {

  constructor(private orderService: OrderService, 
              @Inject(MAT_DIALOG_DATA) public data: DialogOrder) { }

  ngOnInit(): void {
  }

  deleteOrder(order: Order): void {
    this.orderService.deleteOrder(order);
  }

}

export interface DialogOrder {
  order: Order;
}