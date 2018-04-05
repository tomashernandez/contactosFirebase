import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule, 
  MatCardModule, 
  MatMenuModule, 
  MatToolbarModule, 
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatListModule,
  MatDialogModule
  } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Observable } from 'rxjs/Observable';
import { ContactosService } from './services/contactos.service';

import 'hammerjs';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import {FirebaseListObservable } from 'angularfire2/database-deprecated';
import { AppComponent } from './app.component';
import { DetallesComponent } from './detalles/detalles.component';
import { EditarComponent } from './editar/editar.component';
import { DialogComponent } from './dialog/dialog.component';


export const firebaseConfig= {
  apiKey: "AIzaSyCVIYu6Dzyrhdu1lcJrR-wdeys-umIMrgo",
  authDomain: "contactos-42699.firebaseapp.com",
  databaseURL: "https://contactos-42699.firebaseio.com",
  storageBucket: "contactos-42699.appspot.com",
  messagingSenderId: "401820944864"
};

@NgModule({
  declarations: [
    AppComponent,
    DetallesComponent,
    EditarComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [ ContactosService ],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }