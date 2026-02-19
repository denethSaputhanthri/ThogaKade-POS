import { Component } from '@angular/core';
import { CustomerModel } from '../../../../model/type';
import { HttpClient } from '@angular/common/http';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-customer',
  imports: [NgForOf],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {

  customerList:Array<CustomerModel>=[];

  constructor(private http:HttpClient){
    this.loadTable();
  }

  loadTable(){
    this.http.get<CustomerModel[]>(`http://localhost:8080/customer/get`).subscribe(data =>{
      console.log(data);
      
      this.customerList=data
    })
  }

}
