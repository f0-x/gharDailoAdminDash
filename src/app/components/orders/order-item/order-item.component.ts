import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { Router, ActivatedRoute } from '@angular/router';
import { faMinusSquare } from '@fortawesome/free-regular-svg-icons';
import { Location } from '@angular/common';
import { OrderService } from 'src/app/services/order.service';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/interfaces/report';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteOrderComponent } from '../delete-order/delete-order.component';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css'],
})
export class OrderItemComponent implements OnInit {
  faMinusSquare = faMinusSquare;

  orderItem?: Order;
  reports: Report[] = [];

  @Input() orders?: Order[];
  @Output() onDelete: EventEmitter<Order> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private orderService: OrderService,
    private reportService: ReportService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getOrder();
    this.reportService
      .getReports()
      .subscribe((reports) => (this.reports = reports as Report[]));
  }

  openDialog(order: Order) {
    this.dialog.open(DeleteOrderComponent, {
      data: {
        order: order,
      },
    });
  }

  reloadPage() {
    window.location.reload();
  }

  getOrder(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrders().subscribe((orders) => {
      this.orderItem = orders.find((p) => p['id'] === id) as Order;
    });
  }

  addReport(report: Report) {
    this.reportService.addReport(report);
  }

  hasRoute(route: string) {
    return this.router.url === route;
  }
  hasRouteDetail(route: string) {
    return this.router.url !== route;
  }
}
