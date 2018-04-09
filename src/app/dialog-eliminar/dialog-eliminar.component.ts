
import { Component, OnInit,Inject,Input } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from  '@angular/material';
import { ContactosService } from '../services/contactos.service';
@Component({
  templateUrl: './dialog-eliminar.component.html',
})
export class DialogEliminarComponent implements OnInit {
  public title: string;
  public message: string;
  contactoKey:any;
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
    this._contacts.removeContact(this.contactoKey);
    this.contactoKey=null;
    this.dialogRef.close();
  }

}
