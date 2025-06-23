import { Component, OnInit } from '@angular/core';
import { ApiCustomerService } from '../../../services/Customer/api-customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer, ICustomerMoves, ICustomerMovesReturnList } from '../../../models/icustomer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-customer-balance',
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-balance.component.html',
  styleUrl: './customer-balance.component.css'
})
export class CustomerBalanceComponent implements OnInit {
  currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ar";
  fromDate: Date = new Date();
  toDate: Date = new Date();
  CustomerInfo: ICustomer = {} as ICustomer;
  // res: ICustomerMovesReturnList = {} as ICustomerMovesReturnList;
  resList: ICustomerMoves[] = [] as ICustomerMoves[];
  filteredList: ICustomerMoves[] = [];
  pageTitle: string = (this.currentLang == "ar" ? 'كشف حساب عميل' : 'Customer Balance');

  constructor(private _ApiCustomerService: ApiCustomerService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this._ApiCustomerService.getCustomerById(Number(id)).subscribe({
      next: (data: ICustomer) => {
        this.CustomerInfo = data;
        this.pageTitle = (this.currentLang == "ar" ? 'كشف حساب عميل: ' + this.CustomerInfo.customerName : 'Customer Balance: ' + this.CustomerInfo.customerName);
        this.getAllMoves();
      },
      error: (err: string) => {
        console.error('There was an error!', err);
      }
    });
  }

  getAllMoves() {
    this._ApiCustomerService.getAllCustomerMoves(this.CustomerInfo.id, this.fromDate, this.toDate).subscribe({
      next: (result) => {
        this.resList = result.movesList;
        this.filteredList = this.resList;
        console.log(result);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  
  
  CustomersPage() {
    this.router.navigate(['/Customers']);
  }

}
