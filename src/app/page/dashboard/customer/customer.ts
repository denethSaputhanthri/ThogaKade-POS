import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../../model/type';
import { HttpClient } from '@angular/common/http';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-customer',
  imports: [NgForOf],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {

  customerList:Array<CustomerModel>=[];

  constructor(private http:HttpClient,private cdr:ChangeDetectorRef){
  }
  ngOnInit(): void {
    this.getAll();
  }



  getAll(){
    this.http.get<CustomerModel[]>(`http://localhost:8080/customer/get`).subscribe(data =>{
      console.log(data);
      this.customerList=data
      this.cdr.detectChanges();
    })
  }

}
