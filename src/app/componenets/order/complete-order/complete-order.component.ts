import { Component, OnInit } from '@angular/core';
import { ApiOrderService } from '../../../services/Order/api-order.service';
import { ApiUserService } from '../../../services/User/api-user.service';
import { ApiMoneysafeService } from '../../../services/Moneysafe/api-moneysafe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrderHeader, IOrderComplete, IOrder } from '../../../models/iorder';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { IUserSelect } from '../../../models/iuser';
import { IMoneysafe } from '../../../models/imoneysafe';

@Component({
  selector: 'app-complete-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './complete-order.component.html',
  styleUrl: './complete-order.component.css'
})
export class CompleteOrderComponent implements OnInit {
  currentLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "ar";
  pageTitle: string = (this.currentLang == "ar" ? 'تتميم الاوردر' : 'Copmlete Order');
  btnTxt: string = (this.currentLang == "ar" ? 'تتميم ' : 'Copmlete ');
  completeDate: Date = new Date();
  CompleteOrderList: IOrderComplete = {} as IOrderComplete;
  Techs: IUserSelect[] = [];
  selectedTechId: string = "0";
  Paid: number = 0;
  moneysafes: IMoneysafe[] = [] as IMoneysafe[];
  selectedMoneysafeId: number = 0;
  newOrder: IOrder = {} as IOrder;
  
  constructor(private route: ActivatedRoute, private _ApiOrderService: ApiOrderService, private router: Router, private _ApiUserService: ApiUserService, private _ApiMoneysafesService: ApiMoneysafeService) {
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
        this.selectedTechId = this.Techs[0].id;
        this.getAllMoneysafes();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getAllMoneysafes() {
    this._ApiMoneysafesService.getAllMoneysafes().subscribe({
      next: (result) => {
        this.moneysafes = result;
        this.selectedMoneysafeId = this.moneysafes[0].id;
        this.getAllOrderData();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getAllOrderData() {
    const id = this.route.snapshot.paramMap.get('id');
    this._ApiOrderService.getOrderById(Number(id)).subscribe({
      next: (data: IOrder) => {
        this.newOrder = data;
        console.log(data);
        this.Paid = this.newOrder.orderHeader.orderTotal;
        if(this.newOrder.orderHeader.orderStatus == 'اوردر تام') {
          this.selectedTechId = this.newOrder.orderHeader.techId;
          this.completeDate = this.newOrder.orderHeader.installDate;
        }
        if(data.orderPayment != null) {
          this.Paid = data.orderPayment.amount;
          this.selectedMoneysafeId = data.orderPayment.moneySafeId;
        }
        this.btnTxt = (this.currentLang == "ar" ? (this.newOrder.orderHeader.orderStatus == 'اوردر تام' ? 'تعديل التتميم' : 'تتميم ') : (this.newOrder.orderHeader.orderStatus == 'اوردر تام' ? 'Edit' : 'Complete Order'));
      },
      error: (err: string) => {

        console.error('There was an error!', err);
      }
    });
  }

  completeOrder() {
    if (this.completeDate == null || this.completeDate == undefined) {
      Swal.fire({
        title: (this.currentLang == "ar" ? 'الرجاء ادخال تاريخ الاكتمال' : 'Please enter the complete date'),
        icon: 'warning',
        confirmButtonText: (this.currentLang == "ar" ? 'حسنا' : 'OK')
      });
      return;
    }
    this.CompleteOrderList.orderId = this.newOrder.orderHeader.id;
    this.CompleteOrderList.paid = this.Paid;
    this.CompleteOrderList.moneySafeId = this.selectedMoneysafeId;
    this.CompleteOrderList.TechId = (this.selectedTechId);
    this.CompleteOrderList.CompleteDate = this.completeDate;

    this._ApiOrderService.completeOrder(this.CompleteOrderList).subscribe({
      next: (result) => {
        Swal.fire({
          title: (this.currentLang == "ar" ? 'تم انهاء الاوردر بنجاح' : 'Completed successfully'),
          icon: 'success',
          confirmButtonText: (this.currentLang == "ar" ? 'حسنا' : 'OK')
        });
        this.cancel();
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  unComplete() {
    Swal.fire({
          title: `هل تريد الغاء تميم الاوردر رقم "${this.newOrder.orderHeader.id}" ومسح عملية الدفع?`,
          showCancelButton: true,
          confirmButtonText: "الغاء التتميم",
          cancelButtonText: "العودة",
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
           
            this._ApiOrderService.unCompleteOrder(this.newOrder.orderHeader.id).subscribe({
              next: (result) => {
                Swal.fire({
                  title: 'تم!',
                  text: `تم الغاء تميم الاوردر رقم ${this.newOrder.orderHeader.id}ومسح عملية الدفع بنجاح!`,
                  icon: 'success',
                  confirmButtonText: 'Cool'
                })
                this.cancel();
              },
              error: (error) => {
                console.log(error);
              }
            });
          } else if (result.isDenied) {
    
          }
        });
  }

  cancel() {
    this.router.navigate(['/Orders']);
  }

}
