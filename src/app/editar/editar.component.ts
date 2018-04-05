import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ContactosService } from '../services/contactos.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

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
  @Output() cerrar = new EventEmitter();

  formEditar:FormGroup;
  contactOrigin:any;

  constructor(
      private _contactos: ContactosService,
      private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.formEditar=this.fb.group({
      nombre:'',
      apellidos:'',
      empresa:'',
      direccion:'',
      telefono:'',
      email:'',
    });
  }

  onGuardar(){
    this._contactos.updateContact(this.contactOrigin.$key,this.formEditar.value);
    this.onCancelar();
  }

  onCancelar(){
    this.contactOrigin=null;
    this.cerrar.emit();
  }

}
