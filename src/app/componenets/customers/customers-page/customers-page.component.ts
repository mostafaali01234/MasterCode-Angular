import { Component, OnInit } from '@angular/core';
import { ApiCustomerService } from '../../../services/Customer/api-customer.service';
import { Router } from '@angular/router';
import { ICustomer } from '../../../models/icustomer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-customers-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './customers-page.component.html',
  styleUrl: './customers-page.component.css'
})
export class CustomersPageComponent implements OnInit {
  currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ar";
  customers: ICustomer[] = [] as ICustomer[];
  filteredCustomers: ICustomer[] = [];
  pageTitle: string = (this.currentLang == "ar" ? 'قايمة العملاء' : 'Customers List');
  selectedCatId: number = 0;
  imageWidth: number = 30;
  imageMargin: number = 5;
  showImage: boolean = true;
  private _filterText!: string;
  get filterText(): string {
    return this._filterText;
  }
  set filterText(value) {
    this._filterText = value;
    this.filteredCustomers = this.performFilter(value);
  }

  constructor(private _ApiCustomerService: ApiCustomerService, private router: Router) {
    console.log(this.pageTitle)
  }

  ngOnInit() {
    this.getAllCustomers();
  }
  getAllCustomers() {
    this._ApiCustomerService.getAllCustomers().subscribe({
      next: (result) => {
        console.log(result);
        this.customers = result;
        this.filteredCustomers = this.customers;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  performFilter(filterBy: string): ICustomer[] {
    filterBy = filterBy.toLowerCase();
    return this.customers.filter((customer: ICustomer) =>
      customer.customerName.toLowerCase().includes(filterBy) 
    // || customer.customerPhoneNumber.toString().includes(filterBy) 
    || customer.customerPhoneNumber.toLowerCase().includes(filterBy) 
    || customer.addedUserName.toLowerCase().includes(filterBy)
    || customer.customerAddress.toLowerCase().includes(filterBy)
    );
  }

  NewCustomer() {
    this.router.navigate(['/AddCustomer']);
  }

  EditCustomer(id: number) {
    this.router.navigate(['/AddCustomer/' + id]);
  }

  CustomerBalance(id: number) {
    this.router.navigate(['/CustomerBalance/' + id]);
  }

  DeleteCustomer(customer: ICustomer) {
    Swal.fire({
      title: `هل تريد حذف العميل  "${customer.customerName}"?`,
      showCancelButton: true,
      confirmButtonText: "حذف",
      cancelButtonText: "الغاء",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._ApiCustomerService.deleteCustomer(customer.id).subscribe({
          next: (result) => {
            Swal.fire({
              title: 'تم!',
              text: `تم حذف العميل ${customer.customerName} بنجاح!`,
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            this.getAllCustomers();
          },
          error: (error) => {
            console.log(error);
          }
        });
      } else if (result.isDenied) {

      }
    });
  }
}
