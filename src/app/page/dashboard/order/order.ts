import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderModel } from '../../../../model/type';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-order',
  imports: [NgForOf],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit{
  orderList: Array<OrderModel>=[];

  constructor(
    private http: HttpClient,
    private crd: ChangeDetectorRef
  ){}
  
  ngOnInit(): void {
   this.getAll();
  }

  getAll(){
    this.http.get<OrderModel[]>(`http://localhost:8080/order/get`).subscribe((data)=>{
      this.orderList=data;
      this.crd.detectChanges();
    });
    console.log(this.orderList);
  }

}
