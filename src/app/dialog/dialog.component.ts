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
    @Inject(MAT_DIALOG_DATA) public dataDialog
 
  ) { }

  ngOnInit() {
    this.form=this.formBuilder.group({
      nombre: this.dataDialog ? this.dataDialog.nombre : '',
      apellidos:this.dataDialog ? this.dataDialog.apellidos : '',
      empresa:this.dataDialog ? this.dataDialog.empresa : '',
      direccion:this.dataDialog ? this.dataDialog.direccion : '',
      telefono:this.dataDialog ? this.dataDialog.telefono : '',
      email:this.dataDialog ? this.dataDialog.email : '',
    });
  }

  submit(form){
    this.dialogRef.close(`${form.value.filename}`);
  }

  closeModal(){
    
  }

}
