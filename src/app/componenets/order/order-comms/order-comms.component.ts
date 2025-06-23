import { Component, OnInit } from '@angular/core';
import { ApiOrderService } from '../../../services/Order/api-order.service';
import { Router } from '@angular/router';
import { ICommission } from '../../../models/icommission';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-comms',
  imports: [CommonModule, FormsModule],
  templateUrl: './order-comms.component.html',
  styleUrl: './order-comms.component.css'
})
export class OrderCommsComponent implements OnInit {
  currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ar";
  commsList: ICommission[] = [] as ICommission[];
  filteredList: ICommission[] = [];
  pageTitle: string = (this.currentLang == "ar" ? 'عمولات الاوردرات' : 'Commissions List');
  orderId: number = 0;
  errorMsg: string = "";


  constructor(private _ApiOrderService: ApiOrderService, private router: Router) {
    console.log(this.pageTitle)
  }

  ngOnInit() {
  }

  getCommsByOrderId() {
    this._ApiOrderService.getOrderComms(this.orderId).subscribe({
      next: (result) => {
        console.log(result);
        this.commsList = result;
        this.filteredList = this.commsList;
      },
      error: (error) => {
        console.log((error))
        this.errorMsg = error.error.message;
        this.commsList = [] as ICommission[];
        this.filteredList = [];
        Swal.fire({
          icon: 'error',
          title: this.currentLang == "ar" ? 'خطأ' : 'Error',
          text: this.errorMsg,
          confirmButtonText: this.currentLang == "ar" ? 'حسنا' : 'OK'
        });
      }
    })
  }
}

