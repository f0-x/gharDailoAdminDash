import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  orders: Order[] = [];

constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    /* Get the orders from Firebase, store them in 'orders'
    and use them in <app-order-item [orders]=orders></app-order-item> */
    this.orderService.getOrders().subscribe((orders)=>(this.orders = orders as Order[]));
  }

}
