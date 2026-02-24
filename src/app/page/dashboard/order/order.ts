import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderModel } from '../../../../model/type';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  imports: [NgForOf,FormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit{
  orderList: Array<OrderModel>=[];

  orderObj: OrderModel={
    id: '',
    orderDate: new Date(),
    customerId: ''
  }

  constructor(
    private http: HttpClient,
    private crd: ChangeDetectorRef
  ){}
  
  ngOnInit(): void {
   this.getAll();
  }

  deleteOrder(orderId:any ){
    this.http.delete(`http://localhost:8080/order/delete/${orderId}`).subscribe(response=>{
      Swal.fire("Item is deleted.!");
      this.getAll();
    })
  }

  addOrder(){
    this.http.post(`http://localhost:8080/order/add`,this.orderObj).subscribe
    ((data)=>{});
    this.getAll()
  }

  getAll(){
    this.http.get<OrderModel[]>(`http://localhost:8080/order/get`).subscribe((data)=>{
      this.orderList=data;
      this.crd.detectChanges();
    });
  }

}
