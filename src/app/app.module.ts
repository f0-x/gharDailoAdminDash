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
import { DashboardComponent } from './components/dashboard/dashboard.component';

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
import { UserSearchPipe } from './components/user/user-search.pipe'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserComponent,
    DashboardComponent,
    AddUserComponent,
    DeleteUserComponent,
    UserSearchPipe,
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
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
