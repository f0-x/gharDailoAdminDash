import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
//Angular Material 

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDividerModule } from "@angular/material/divider";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatMenuModule } from "@angular/material/menu";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import {MatDialogModule} from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';

import {AngularFireModule} from '@angular/fire/compat'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { HotToastModule } from '@ngneat/hot-toast';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';
import { UserSearchPipe } from './components/user/user-search.pipe';
import { OrdersComponent } from './components/orders/orders.component';
import { AddOrderComponent } from './components/orders/add-order/add-order.component';
import { AddOrderReportComponent } from './components/orders/add-order-report/add-order-report.component';
import { DeleteOrderComponent } from './components/orders/delete-order/delete-order.component';
import { OrderItemComponent } from './components/orders/order-item/order-item.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';
import { TaskSearchPipe } from './components/tasks/task-search.pipe';
import { ReportsComponent } from './components/reports/reports.component';
import { AddReportComponent } from './components/reports/add-report/add-report.component';
import { ReportBillingComponent } from './components/reports/report-billing/report-billing.component';
import { ReportDetailComponent } from './components/reports/report-detail/report-detail.component'

import { AngularEditorModule } from '@kolkov/angular-editor';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { ButtonComponent } from './components/shared/button/button.component';

import { WindowService } from './services/window.service';
import { PhoneLoginComponent } from './components/phone-login/phone-login.component';

import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular'
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { OtpComponent } from './components/phone-login/otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { PhoneAuthProvider } from 'firebase/auth';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    //term of service
    tosUrl: '<your-tos-link>',
    //privacy url
    privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
    //credentialHelper:             firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
    credentialHelper: firebaseui.auth.CredentialHelper.NONE
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    AddUserComponent,
    DeleteUserComponent,
    UserSearchPipe,
    OrdersComponent,
    AddOrderComponent,
    AddOrderReportComponent,
    DeleteOrderComponent,
    OrderItemComponent,
    TasksComponent,
    AddTaskComponent,
    TaskDetailComponent,
    TaskSearchPipe,
    ReportsComponent,
    AddReportComponent,
    ReportBillingComponent,
    ReportDetailComponent,
    SidebarComponent,
    ButtonComponent,
    PhoneLoginComponent,
    OtpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatBadgeModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    NgbModule,
    HotToastModule.forRoot(),
    FlexLayoutModule,
    AngularEditorModule,
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    NgOtpInputModule,
  ],
  providers: [
    ScreenTrackingService,UserTrackingService, WindowService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
