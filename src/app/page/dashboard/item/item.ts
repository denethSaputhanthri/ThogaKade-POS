import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ItemModel } from '../../../../model/type';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item',
  imports: [NgForOf,FormsModule],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item implements OnInit{

  itemList:Array<ItemModel>=[];

  itemObj: ItemModel= {
    id: '',
    description: '',
    packSize: '',
    unitPrice: 0.0,
    qty: 0.0,
  }

  constructor(
    private http: HttpClient,
    private crd : ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  addItem(){
    console.log(this.itemObj);
  
    this.http.post(`http://localhost:8080/item/add`, this.itemObj ).
    subscribe((data)=>{
      console.log(data);
      if(data=== true){

      }
      this.getAll()
    });
  }

  getAll(){
    this.http.get<ItemModel[]>(`http://localhost:8080/item/get`).subscribe((data)=>{
      this.itemList=data;
      console.log(data);
      this.crd.detectChanges();
    })
  }
}
