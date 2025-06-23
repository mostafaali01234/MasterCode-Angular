import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../../../models/icustomer';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiCustomerService } from '../../../services/Customer/api-customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css'
})
export class AddCustomerComponent implements OnInit {
  newCustomer: ICustomer = {} as ICustomer;
  title: string = 'اضافة عميل جديد';
  btnTxt: string = 'اضافة';


  constructor(private router: Router
    , private route: ActivatedRoute
    , private _ApiCustomerService: ApiCustomerService) {
  }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.route.snapshot.paramMap);
    if (id) {
      this.title = 'تعديل بيانات عميل';
      this.btnTxt = 'تعديل';
      this._ApiCustomerService.getCustomerById(Number(id)).subscribe({
        next: (data: ICustomer) => {
          this.newCustomer = data;
        },
        error: (err: string) => {
          console.error('There was an error!', err);
        }
      });
    }
  }


  addNewCustomer() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(this.newCustomer);
    if (id) {
      this._ApiCustomerService.updateCustomer(this.newCustomer).subscribe({
        next: (data: ICustomer) => {
          console.log(data);
          Swal.fire({
            title: 'تم!',
            text: `تم تعديل العميل ${data.customerName} بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoCustomersPage();
        },
        error: (err: string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
    else {
      this.newCustomer.applicationUserId = "0";
      this._ApiCustomerService.createCustomer(this.newCustomer).subscribe({
        next: (data: ICustomer) => {
          Swal.fire({
            title: 'تم!',
            text: `تم اضافة العميل ${data.customerName} بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoCustomersPage();
        },
        error: (err: string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
  }

  gotoCustomersPage() {
    this.router.navigate(['/Customers']);
  }
}
