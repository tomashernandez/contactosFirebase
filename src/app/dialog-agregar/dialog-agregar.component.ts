import { Component, OnInit,Output,Input,EventEmitter,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from  '@angular/material';
import { FormGroup,FormBuilder, FormControl,Validators }  from '@angular/forms';
import { ContactosService } from '../services/contactos.service';

@Component({
  templateUrl: './dialog-agregar.component.html',
})
export class DialogAgregarComponent implements OnInit {
  formAgregar:FormGroup;
  validationMessages={
    nombre:{'required':'El nombre es requedio'},
    apellidos:{'required':'Los apellidos son requeridos'},
    direccion:{'required':'La dirección es requerida'}
  }

  constructor(
    private formBuilderAgregar:FormBuilder,
    private dialogRef:MatDialogRef<DialogAgregarComponent>,
    private _contact:ContactosService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.formAgregar=this.formBuilderAgregar.group({
      nombre: new FormControl('', [Validators.required,  Validators.minLength(4)]),
      apellidos:new FormControl('', [Validators.required,  Validators.minLength(4)]),
      empresa: '',
      direccion: new FormControl('', [Validators.required,  Validators.minLength(2)]),
      telefono: '',
      email:'',
    });
  }

  onAgregar(contacto){
   // console.log(contacto);
    this._contact.addContact(contacto);
    this.dialogRef.close();
  }

}
