import { Component,OnInit ,OnDestroy} from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule,AngularFireDatabase,AngularFireList  } from 'angularfire2/database';
import { ContactosService } from './services/contactos.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog,MatDialogRef } from  '@angular/material';
import { DialogComponent }  from  './dialog/dialog.component';



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
  contactoEditar=null;

  constructor(private _contactos:ContactosService,private _dialog:MatDialog){}

  ngOnInit(){
   this.contactsSubscription= this._contactos.getContacts()
    .subscribe(contactos=>this.contactos=contactos);
    this.ciudades=this._contactos.getCitiesFilter();
  }

  onSelect(direccion: string|null){
    let query=null;
    if(direccion=='Todas'){
      query=this._contactos.getContacts();
      query.subscribe(contactos=>{
        this.contactos=contactos;
      });
    }else{
      this.filtrados=this._contactos.getContactFilter2(direccion);
      this.filtroSubscription=this.filtrados.subscribe(queriedItems => {
          this.contactos=queriedItems; 
          console.log(this.contactos);
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

  closeDetalles(){
    this.contacto=null;
    this.dialogRef.close();
  }

  onEditar(contacto){
    this.contactoEditar=contacto;
    console.log(this.contactoEditar);
  }

  cerrarEdicion(){
      this.contactoEditar=null;
  }


}
