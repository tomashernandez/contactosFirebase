import { Component, OnInit,Output,Input,EventEmitter,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from  '@angular/material';
import { FormGroup,FormBuilder }  from '@angular/forms';
import { ContactosService } from '../services/contactos.service';

@Component({
  templateUrl: './dialog-editar.component.html',
})
export class DialogEditarComponent implements OnInit {

  formEditar:FormGroup;
  contactOrigin:any;
/*
  @Input() set contacto(val){
    this.createForm();
    if(val){
      this.contactOrigin=val;
      this.formEditar.patchValue({
        nombre:val.nombre,
        apellidos:val.apellidos,
        empresa:val.empresa,
        direccion:val.direccion,
        telefono:val.telefono,
        email:val.email,
      });
    }
  };
  @Output() cerrar = new EventEmitter();*/

  constructor(
    private formBuilderEditar:FormBuilder,
    private dialogRef:MatDialogRef<DialogEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public dataEditar,
    private _contactos:ContactosService
  ) { }

  ngOnInit() {
    this.contactOrigin=null;
    this.contactOrigin=this.dataEditar.contactOrigin;
    this.formEditar=this.formBuilderEditar.group({
      nombre: this.dataEditar ? this.dataEditar.nombre : '',
      apellidos:this.dataEditar ? this.dataEditar.apellidos : '',
      empresa:this.dataEditar ? this.dataEditar.empresa : '',
      direccion:this.dataEditar ? this.dataEditar.direccion : '',
      telefono:this.dataEditar ? this.dataEditar.telefono : '',
      email:this.dataEditar ? this.dataEditar.email : '',
    });
   // this.createForm();
  }

  createForm(){
    this.formEditar=this.formBuilderEditar.group({
      nombre:'',
      apellidos:'',
      empresa:'',
      direccion:'',
      telefono:'',
      email:'',
    });
  }
 
  onGuardar(){
    //console.log(this.contactOrigin,this.formEditar.value);
    this._contactos.updateContact(this.contactOrigin,this.formEditar.value);
    this.dialogRef.close();
   // this.contactOrigin=null;
  }

}
