import { Component, OnInit } from '@angular/core';
import { IOrder, IOrderDetail, IOrderHeader } from '../../../models/iorder';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiProductsService } from '../../../services/api-products.service';
import { ApiUserService } from '../../../services/User/api-user.service';
import { ApiCustomerService } from '../../../services/Customer/api-customer.service';
import { ApiOrderService } from '../../../services/Order/api-order.service';
import { ShoppingCartService } from '../../../services/ShoppingCart/shopping-cart.service';
import Swal from 'sweetalert2';
import { ICustomer } from '../../../models/icustomer';
import { IUserSelect } from '../../../models/iuser';
import { IProduct } from '../../../models/iproduct';

@Component({
  selector: 'app-add-order',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})
export class AddOrderComponent implements OnInit {

  newOrder: IOrder = {} as IOrder;
  products: IProduct[] = [] as IProduct[];
  emps: IUserSelect[] = [] as IUserSelect[];
  customers: ICustomer[] = [] as ICustomer[];
  dets: IOrderDetail[] = [] as IOrderDetail[];
  newDet: IOrderDetail = {
    count: 1,
    price: 0,
    totalPrice: 0,
  } as IOrderDetail;

  title: string = 'اضافة اوردر جديد';
  btnTxt: string = 'اضافة الاوردر';

  private _productSearchText!: string;
  private _customerSearchText!: string;
  get productSearchText(): string {
    return this._productSearchText;
  }
  set productSearchText(value) {
    this._productSearchText = value;
    this._ApiProductsService.getProductByName(this._productSearchText).subscribe({
      next: (data: IProduct) => {
        this.newDet.productId = data.id;
        this.newDet.productName = data.title;
        this.newDet.price = data.price;
        this.newDet.totalPrice = this.newDet.price * this.newDet.count;
      },
      error: (err: string) => {
        console.error('There was an error!', err);
      }
    });
  }
  get customerSearchText(): string {
    return this._customerSearchText;
  }
  set customerSearchText(value) {
    this._customerSearchText = value;
    this._ApiCustomerService.getCustomerNamePhone(this._customerSearchText).subscribe({
      next: (data: ICustomer) => {
        this.newOrder.orderHeader.customerId = data.id;
      },
      error: (err: string) => {
        console.error('There was an error!', err);
      }
    });
  }

  constructor(private router: Router
    , private route: ActivatedRoute
    , private _ApiShoppingCartService: ShoppingCartService
    , private _ApiOrderService: ApiOrderService
    , private _ApiUserService: ApiUserService
    , private _ApiCustomerService: ApiCustomerService
    , private _ApiProductsService: ApiProductsService
  ) {
  }

  //--------------------------------------------------------------

  ngOnInit() {
    this.newOrder = {
      orderHeader: {} as IOrderHeader,
      orderDetailsList: []
    } as IOrder;
    this.newOrder.orderHeader.orderDate = new Date();
    this.getEmpInputData();
  }

  //--------------------------------------------------------------

  getEmpInputData() {
    //Emps
    this._ApiUserService.getAllUsers().subscribe({
      next: (data: IUserSelect[]) => {
        this.emps = data;
        this.getProductsInputData();
      },
      error: (err: string) => {
        console.error('There was an error!', err);
      }
    });
  }

  getProductsInputData() {
    //Emps
    this._ApiProductsService.getAllProducts().subscribe({
      next: (data: IProduct[]) => {
        this.products = data;
        this.newDet.productId = this.products[0].id;
        this.newDet.productName = this.products[0].title;
        this.newDet.price = this.products[0].price;
        this.newDet.totalPrice = this.products[0].price * this.newDet.count;

        this.getCustomersInputData();
      },
      error: (err: string) => {
        console.error('There was an error!', err);
      }
    });
  }

  getCustomersInputData() {
    //Emps
    this._ApiCustomerService.getAllCustomers().subscribe({
      next: (data: ICustomer[]) => {
        this.customers = data;
        this.getOldNewOrderData();
      },
      error: (err: string) => {
        console.error('There was an error!', err);
      }
    });
  }

  getOldNewOrderData() {
    const id = this.route.snapshot.paramMap.get('id');
    //console.log(this.route.snapshot.paramMap);

    // console.log(this.newOrder);
    this.newOrder.orderHeader.applicationUserId = this.emps[0].id;
    this.newOrder.orderHeader.applicationUserName = this.emps[0].userName;
    this.newOrder.orderHeader.customerName = this.customers[0].customerName;
    this.newOrder.orderHeader.customerId = this.customers[0].id;
    this.newOrder.orderHeader.orderTotal = 0;
    this.newOrder.orderHeader.orderStatus = 'اوردر جديد';
    this.newOrder.orderHeader.paymentStatus = 'لم يتم الدفع';
    this.newOrder.orderHeader.orderNotes = '';



    if (id) {
      
      this.title = 'تعديل بيانات الاوردر';
      this.btnTxt = 'تعديل الاوردر';
      this._ApiOrderService.getOrderById(Number(id)).subscribe({
        next: (data: IOrder) => {
          this.newOrder = data;
          //this.dets = { ...data.orderDetailsList } as IOrderDetail[];

          //console.log(this.dets);
          this.dets = data?.orderDetailsList;


           this.dets.forEach(element => {
             element.totalPrice = element.price * element.count;
           });
          //console.log(this.dets);
        },
        error: (err: string) => {

          console.error('There was an error!', err);
        }
      });
    }
    else {
      this._ApiShoppingCartService.getAllCart().subscribe({
        next: (data: IOrderDetail[]) => {
          this.dets = data;
          this.dets.forEach(element => {
            element.totalPrice = element.price * element.count;
          });
          console.log(this.dets);
        },
        error: (err: string) => {
          console.error('There was an error!', err);
        }
      });
    }

  }

  //--------------------------------------------------------------


  getProductInfo() {
    this._ApiProductsService.getProductById(this.newDet.productId).subscribe({
      next: (data: IProduct) => {
        this.newDet.productId = data.id;
        this.newDet.productName = data.title;
        this.newDet.price = data.price;
        this.newDet.totalPrice = this.newDet.price * this.newDet.count;
      },
      error: (err: string) => {
        console.error('There was an error!', err);
      }
    });
  }

  getDetsSum(): number {
    return this.dets.reduce((sum, item) => sum + (item.price * item.count), 0);
  }


  //#region cart

  AddToCart() {
    const index = this.dets.findIndex(z => z.productId === this.newDet.productId && z.price === this.newDet.price);
    this.newDet.totalPrice = this.newDet.price * this.newDet.count;
    const id = this.route.snapshot.paramMap.get('id');


    if (index !== -1 && !id) {
      this.dets[index].count += this.newDet.count;
      this.dets[index].totalPrice = this.dets[index].count * this.dets[index].price;
      this._ApiShoppingCartService.updateCartItem(this.dets[index]).subscribe({
        next: (data: IOrderDetail) => {
          this.dets[index].id = data.id;
        },
        error: (err: string) => {
          this.dets[index].count -= this.newDet.count;
          this.dets[index].totalPrice = this.dets[index].count * this.dets[index].price;
        }
      });
    }
    else if (index !== -1 && id) {
      this.dets[index].count += this.newDet.count;
      this.dets[index].totalPrice = this.dets[index].count * this.dets[index].price;
    }
    else {
      if(id){
        this.dets.push({ ...this.newDet } as IOrderDetail);
      }
      else{
        this._ApiShoppingCartService.addToCart(this.newDet).subscribe({
          next: (data: IOrderDetail[]) => {
            this.dets = data;
            this.dets.forEach(element => {
              element.totalPrice = element.price * element.count;
            });
          },
          error: (err: string) => {
            console.error('There was an error!', err);
          }
        });
      }


    }

    console.log(this.dets);
  }

  removeFromCart(id: number) {
    const orderId = this.route.snapshot.paramMap.get('id');
    const index = this.dets.findIndex(z => z.id === id);
    if (index !== -1 && !orderId) {
      this._ApiShoppingCartService.deleteOneCart(id).subscribe({
        next: (data: any) => {
          this.dets.splice(index, 1);
        },
        error: (err: string) => {
          this.dets[index].count -= this.newDet.count;
          this.dets[index].totalPrice = this.dets[index].count * this.dets[index].price;
        }
      });
    }
    else if (orderId) {
      this.dets.splice(index, 1);
    }
  }

  deleteCart() {
    this._ApiShoppingCartService.deleteAllCart().subscribe({
      next: (data: any) => {
      },
      error: (err: string) => {
        console.error('There was an error!', err);
      }
    });
  }
  //#endregion

  //--------------------------------------------------------------

  addNewOrder() {
    if(this.dets.length === 0){
      Swal.fire({
        title: 'خطأ!',
        text: 'لا يمكن اضافة/تعديل اوردر بدون تفاصيل!',
        icon: 'error',
        confirmButtonText: 'حسنا'
      });
      return;
    }


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this._ApiOrderService.updateOrder(this.newOrder).subscribe({
        next: (data: IOrder) => {
          console.log(data);
          Swal.fire({
            title: 'تم!',
            text: `تم تعديل اوردر رقم ${data.orderHeader.id} بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoOrdersPage();
        },
        error: (err: string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
    else {
      this.newOrder.orderDetailsList = this.dets;
      this.newOrder.orderHeader.orderTotal = this.getDetsSum();
      this._ApiOrderService.createOrder(this.newOrder).subscribe({
        next: (data: IOrder) => {
          this.deleteCart();
          Swal.fire({
            title: 'تم!',
            text: `تم اضافة اوردر رقم ${data.orderHeader.id} بنجاح!`,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.gotoOrdersPage();
        },
        error: (err: string) => {
          console.error('هنالك خطأ!', err);
        }
      });
    }
  }


  gotoOrdersPage() {
    this.router.navigate(['/Orders']);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent Enter key from submitting
    }
  }
}
