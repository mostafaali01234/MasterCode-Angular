import { Component, OnInit } from '@angular/core';
import { ApiOrderService } from '../../../services/Order/api-order.service';
import { ApiUserService } from '../../../services/User/api-user.service';
import { Router } from '@angular/router';
import { IOrderHeader, IOrderComplete } from '../../../models/iorder';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { IUserSelect } from '../../../models/iuser';

@Component({
  selector: 'app-orders-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css'
})
export class OrdersPageComponent implements OnInit {
  currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ar";
  orders: IOrderHeader[] = [] as IOrderHeader[];
  filteredOrders: IOrderHeader[] = [];
  pageTitle: string = (this.currentLang == "ar" ? 'قايمة الاوردرات' : 'Orders List');
  CustomerNamePhone: string = "";
  OrderNo: number = 0;
  selectedTechId: string = "0";
  selectedSellerId: string = "0";
  selectedOrderStatus: string = "الكل";
  selectedPaymentStatus: string = "الكل";
  fromDate: Date = new Date();
  toDate: Date = new Date();
  Techs: IUserSelect[] = [];
  Sellers: IUserSelect[] = [];
  CompleteOrderList: IOrderComplete = {} as IOrderComplete;

  constructor(private _ApiOrderService: ApiOrderService, private router: Router, private _ApiUserService: ApiUserService) {
    console.log(this.pageTitle)
  }

  ngOnInit() {
    this.getAllData();
    this.CompleteOrderList = {} as IOrderComplete;
  }

  getAllData() {
    //Emps
    this._ApiUserService.getAllUsers().subscribe({
      next: (result) => {
        this.Techs = result;
        this.Sellers = result;
        this.getAllOrders();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getAllOrders() {
    this._ApiOrderService.getAllOrders(this.fromDate, this.toDate, this.selectedSellerId, this.selectedTechId
      , this.CustomerNamePhone, this.selectedOrderStatus, this.selectedPaymentStatus, this.OrderNo).subscribe({
        next: (result) => {
          console.log(result);
          this.orders = result;
          this.filteredOrders = this.orders;
        },
        error: (error) => {
          console.log(error)
        }
      })
  }


  OrdersComms() {
    this.router.navigate(['/OrderComms']);
  }

  NewOrder() {
    this.router.navigate(['/AddOrder']);
  }


  CompleteOrder(id: number) {
    this.router.navigate(['/CompleteOrder/' + id]);
  }

  EditCompletedOrder(id: number) {
    this.router.navigate(['/CompleteOrder/' + id]);
  }

  DetailsOrder(id: number) {
    this.router.navigate(['/OrderDetails/' + id]);
  }

  EditOrder(id: number) {
    this.router.navigate(['/AddOrder/' + id]);
  }

  CancelOrder(orderId: number) {
    Swal.fire({
      title: `هل تريد الغاء الاوردر رقم "${orderId}"?`,
      showCancelButton: true,
      confirmButtonText: "الغاء",
      cancelButtonText: "العودة",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._ApiOrderService.cancelOrder(orderId).subscribe({
          next: (result) => {
            Swal.fire({
              title: 'تم!',
              text: `تم الغاء الاوردر رقم${orderId} بنجاح!`,
              icon: 'success',
              confirmButtonText: 'Cool'
            })
            this.getAllOrders();
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
