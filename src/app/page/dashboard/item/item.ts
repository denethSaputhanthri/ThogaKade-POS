import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ItemModel } from '../../../../model/type';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-item',
  imports: [NgForOf],
  templateUrl: './item.html',
  styleUrl: './item.css',
})
export class Item implements OnInit{

  itemList:Array<ItemModel>=[];

  constructor(
    private http: HttpClient,
    private crd : ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.http.get<ItemModel[]>(`http://localhost:8080/item/get`).subscribe((data)=>{
      this.itemList=data;
      console.log(data);
      this.crd.detectChanges();
    })
  }
}
