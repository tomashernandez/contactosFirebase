import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/switchMap';
import { AngularFireModule, FirebaseApp } from 'angularfire2';
import { AngularFireDatabase,AngularFireAction,AngularFireList } from 'angularfire2/database';
import { FirebaseDatabase } from '@firebase/database-types';
import { DataSnapshot } from '@firebase/database';


@Injectable()
export class ContactosService {
  contactsFilters:AngularFireList<any>;
  items$: Observable<any[]>;
  contactsRef: AngularFireList<any>; 
  contacts: Observable<any[]>;
  cities:any[];
  size$: BehaviorSubject<string|null>;

  constructor(private afDb:AngularFireDatabase) {}

  getContacts(){
    this.contactsRef=this.afDb.list('contactos');
    return this.contactsRef;
  }

  getContactFilter(filtro:string){
    this.size$=new BehaviorSubject(null);
    this.items$=this.size$.switchMap(direccion=>
      this.afDb.list('contactos',ref=>
        filtro?ref.orderByChild('direccion').equalTo(filtro):ref).snapshotChanges()
    );
   
    return this.items$;
  }

  getCitiesFilter(){
    var obj = {};
    this.contacts = this.afDb.list('/contactos').valueChanges();
    this.cities=['Todas'];
    this.contacts.subscribe(
      x =>{     
        x.forEach(element => {
          if(!this.cities.includes(element.direccion))
            this.cities.push(element.direccion);
        });        
      }   
    );
    return this.cities;
  }

  getCities(){
    var obj = {};
    this.contacts = this.afDb.list('/contactos').valueChanges();
    return this.contacts;
  }

  getContactFilter2(filtro:string){
    this.size$=new BehaviorSubject(null);
    const queryObservable = this.size$.switchMap(direccion =>
      this.afDb.list('/contactos', ref => ref.orderByChild('direccion').equalTo(filtro)).valueChanges()
    );
    return queryObservable;
  } 
  
  updateContact(key,contact){
    this.contactsRef.update(key,contact);
  }

  removeContact(key){
    this.contactsRef.remove(key);
  }

  addContact(contact){
    this.contactsRef.push(contact);
  }
  
}
