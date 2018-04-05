import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  @Input() contact:any=null;
  @Output() close=new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClose(){
    this.close.emit();
  }

}
