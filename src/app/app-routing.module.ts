import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderItemComponent } from './components/orders/order-item/order-item.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ReportBillingComponent } from './components/reports/report-billing/report-billing.component';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './services/auth.guard';
import { OtpComponent } from './components/phone-login/otp/otp.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'otp', component: OtpComponent},
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'task/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'orders/:id', component: OrderItemComponent, canActivate: [AuthGuard] },
  { path: 'billing', component: ReportBillingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
