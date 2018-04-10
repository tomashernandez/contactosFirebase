
import { Component, OnInit,Output,Inject,Input,EventEmitter } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from  '@angular/material';
import { ContactosService } from '../services/contactos.service';
import { Observable } from 'rxjs/Observable';
@Component({
  templateUrl: './dialog-eliminar.component.html',
})
export class DialogEliminarComponent implements OnInit {
  public title: string;
  public message: string;
  contactoKey:any;
  auxCiudades: any[];
  contactos: any[];
 citiesObservable:Observable<any>;
  constructor(
    private dialogRef:MatDialogRef<DialogEliminarComponent>,
    private _contacts:ContactosService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {
    this.contactoKey=this.data.key;
    this.title='Eliminar a '+(this.data ? this.data.nombre : '')+' '+(this.data ? this.data.apellidos : '');
    this.message='¿Está seguro de realizar la acción?';
  }
  onEliminar(){
    var ciudadesResult:any[];
    this._contacts.removeContact(this.contactoKey);
    this.contactoKey=null;
    ciudadesResult=this.citiesFilter();
    this.dialogRef.close({ ciudades: ciudadesResult });
  }



  citiesFilter(){
    this.citiesObservable= this._contacts.getCities();
    this.auxCiudades=['Todas'];
    this.citiesObservable.subscribe(
      x =>{     
        x.forEach(element => {
          if(!this.auxCiudades.includes(element.direccion))
            this.auxCiudades.push(element.direccion);
        });        
      }   
    );
    return this.auxCiudades
  }

}
