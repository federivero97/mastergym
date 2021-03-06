import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { MessagesService } from './services/messages.service';
import { PlansComponent } from './plans/plans.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SelectClientComponent } from './select-client/select-client.component';
import { EnrollmentsListComponent } from './enrollments-list/enrollments-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavBarComponent,
    ClientsListComponent,
    ClientFormComponent,
    PlansComponent,
    EnrollmentComponent,
    SelectClientComponent,
    EnrollmentsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    MessagesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
