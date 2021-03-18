import { SelectModule } from 'ng-uikit-pro-standard';

import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularFireModule} from '@angular/fire';
import{AngularFireDatabaseModule} from '@angular/fire/database';
import{ReactiveFormsModule,FormsModule} from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import{AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader'; 
import { PositioningService } from 'ngx-bootstrap/positioning';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AngularFontAwesomeModule } from 'angular-font-awesome';







@NgModule({
  declarations: [
    AppComponent,
    

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule,
    AngularFontAwesomeModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MDBBootstrapModule.forRoot(),
    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    
    
  ],
  providers: [NgbActiveModal, BsModalService,ComponentLoaderFactory,PositioningService],
  bootstrap: [AppComponent]
})
export class AppModule { }
