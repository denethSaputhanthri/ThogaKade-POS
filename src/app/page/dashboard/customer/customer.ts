import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CustomerModel } from '../../../../model/type';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  imports: [NgForOf, NgIf, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer implements OnInit {
  customerList: Array<CustomerModel> = [];

  isEditMode: boolean = false;

  customerObj: CustomerModel = {
    id: '',
    title: '',
    name: '',
    dobValue: '',
    salary: 0.0,
    address: '',
    city: '',
    province: '',
    postalCode: '',
  };

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}
  ngOnInit(): void {
    this.getAll();
  }

  addOrEditCustomer() {
    console.log(this.customerObj);
    
    if (this.isEditMode) {
      this.http.put(`http://localhost:8080/customer/update`, this.customerObj).subscribe((data) => {
      
        if (data === true) {
        Swal.fire("Customer is updated.!");
        } 
        this.clear();
        this.isEditMode = false;
        this.getAll();
      });
      return;
    }

    this.http.post(`http://localhost:8080/customer/add`, this.customerObj).subscribe((data) => {
      if (data === true) {
        Swal.fire({
          title: 'Good job !' + this.customerObj.name + 'saved!',
          text: 'You clicked the button !',
          icon: 'success',
        });
      }
      this.getAll();
    });
  }

  deleteCustomer(id: string) {
    this.http.delete(`http://localhost:8080/customer/delete/${id}`).subscribe((response) => {
      if (response=== true) {
        Swal.fire('User is deleted.!');
      }
      this.getAll();
    });
  }

  getAll() {
    this.http.get<CustomerModel[]>(`http://localhost:8080/customer/get`).subscribe((data) => {
      this.customerList = data;
      this.cdr.detectChanges();
    });
  }

  edit(customer: CustomerModel) {
    this.customerObj = customer;

    this.isEditMode = true;

    window.scrollTo({
      top: 300,
      left: 0,
      behavior: 'smooth',
    });
  }

  clear() {
    this.customerObj = {
      id: '',
      title: '',
      name: '',
      dobValue: '',
      salary: 0.0,
      address: '',
      city: '',
      province: '',
      postalCode: '',
    };
  }

  cancel() {
    this.isEditMode = false;
    this.clear();
  }
}
