import { Component,OnInit ,OnDestroy} from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule,AngularFireDatabase,AngularFireList  } from 'angularfire2/database';
import { ContactosService } from './services/contactos.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog,MatDialogRef } from  '@angular/material';
import { DialogComponent }  from  './dialog/dialog.component';
import { DialogEditarComponent } from './dialog-editar/dialog-editar.component';
import { DialogEliminarComponent } from './dialog-eliminar/dialog-eliminar.component';
import { DialogAgregarComponent } from './dialog-agregar/dialog-agregar.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Contactos';
  contactos: any[];
  contacto:null;
  contactsRef: AngularFireList<any>;
  ciudades:any[];
  filtrados: Observable<any[]>;
  private contactsSubscription: Subscription = null;
  private filtroSubscription: Subscription = null;
  dialogRef:MatDialogRef<DialogComponent>;
  dialogRefEditar:MatDialogRef<DialogEditarComponent>;
  dialogRefEliminar:MatDialogRef<DialogEliminarComponent>;
  dialogRefAgregar:MatDialogRef<DialogAgregarComponent>;
  contactOrigin:any;

  constructor(private _contactos:ContactosService,private _dialog:MatDialog){}

  ngOnInit(){
    this.listadoContactos();
    this.ciudades=this._contactos.getCitiesFilter();

  }

  onSelect(direccion: string|null){
    let query=null;
    if(direccion=='Todas'){
      this.listadoContactos();
    
    }else{
      this.filtrados=this._contactos.getContactFilter2(direccion);
      this.filtroSubscription=this.filtrados.subscribe(queriedItems => {
          this.contactos=queriedItems; 
      });
    }
    this.contacto=null;
  }

  ngOnDestroy(){
    this.contactsSubscription.unsubscribe();
    this.filtroSubscription.unsubscribe();
  }

  onClick(contacto){
    //this.contacto=contacto;
    this.dialogRef=this._dialog.open(DialogComponent,{
      width:'400px',
      disableClose:true,
      data: contacto
    });
    this.dialogRef
    .afterClosed()
    .subscribe(name => console.log(name));
  //  
  }

  listadoContactos(){
   return this._contactos.getContacts().snapshotChanges()
    .map(changes=>{
      return changes.map(c  =>  ({key:  c.payload.key, ...c.payload.val()}))
   }).subscribe(contactos=>this.contactos=contactos);
  }

  closeDetalles(){
    this.contacto=null;
    this.dialogRef.close();
  }

  onEditarDialog(contacto){
    contacto.contactOrigin=contacto.key;
    this.dialogRefEditar=this._dialog.open(DialogEditarComponent,{
      width:'400px',
      disableClose:true,
      data: contacto
    });
  }

  onEliminarDialog(contacto){
    this.dialogRefEliminar=this._dialog.open(DialogEliminarComponent,{
      width:'400px',
      disableClose:true,
      data: contacto
    });
  }

  onAgregar(){
    this.dialogRefAgregar=this._dialog.open(DialogAgregarComponent,{
      width:'400px',
      disableClose:true
    })
  }

}
