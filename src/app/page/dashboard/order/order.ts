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

  isEditMode:Boolean = false;

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

  addOrEditOrder(){
    this.http.post(`http://localhost:8080/order/add`,this.orderObj).subscribe
    ((data)=>{
      if (data === true) {
        Swal.fire("Item  is Added.!")
      }
      this.getAll()
    });

    if (this.isEditMode) {
      this.http.put(`http://localhost:8080/order/update`,this.orderObj).subscribe((data)=>{
        if (data=== true) {
          Swal.fire("Item  is update.!")
        }
      });
    }

  }
  
  addOrder(){
    this.http.post(`http://localhost:8080/order/add`,this.orderObj).subscribe
    ((data)=>{
      
      this.getAll()
    });
  }
  
  deleteOrder(orderId:string){
    this.http.delete(`http://localhost:8080/order/delete/${orderId}`).subscribe(response=>{
      Swal.fire("Item  is deleted.!");
      this.getAll();
    })
  }

  getAll(){
    this.http.get<OrderModel[]>(`http://localhost:8080/order/get`).subscribe((data)=>{
      this.orderList=data;
      this.crd.detectChanges();
    });
  }

  edit(order : OrderModel){
    this.isEditMode = true;
    this.orderObj = order;

      window.scrollTo({
      top: 100,
      left: 0,
      behavior: 'smooth',
    });
  }
  cancel(){
    this.isEditMode = false;
    this.clear();
  }

  clear(){
    if (this.isEditMode) {
      this.cancel();
    }
    this.orderObj={
       id: '',
       orderDate: new Date(),
       customerId: ''
    }
  }
}
