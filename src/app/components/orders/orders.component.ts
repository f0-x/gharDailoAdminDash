import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  @Input() receivedOrders?: Order[];
  orders: Order[] = [];


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (orders) => (this.orders = orders as Order[])
    );
  }

  addOrder(order: Order) {
    this.orderService.addOrder(order);
  }

}
