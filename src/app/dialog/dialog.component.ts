import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from  '@angular/material';
import { FormGroup,FormBuilder }  from '@angular/forms';


/*@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})*/
@Component({
  templateUrl:'./dialog.component.html'
})


export class DialogComponent implements OnInit {

  form:FormGroup;
  
  constructor(
    private formBuilder:FormBuilder,
    private dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
 
  ) { }

  ngOnInit() {
    this.form=this.formBuilder.group({
      nombre: this.data ? this.data.nombre : '',
      apellidos:this.data ? this.data.apellidos : '',
      empresa:this.data ? this.data.empresa : '',
      direccion:this.data ? this.data.direccion : '',
      telefono:this.data ? this.data.telefono : '',
      email:this.data ? this.data.email : '',
    });
  }

  submit(form){
    this.dialogRef.close(`${form.value.filename}`);
  }

  closeModal(){
    console.log('here')
  }

}
