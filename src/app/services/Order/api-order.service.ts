import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IOrderHeader, IOrder } from '../../models/iorder';
import { UserAuthService } from '../user-auth.service';
import { formatDate } from '@angular/common';
import { ICommission } from '../../models/icommission';

@Injectable({
  providedIn: 'root'
})
export class ApiOrderService {

  constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }

  getAllOrders(fromCreateDate: Date, toCreateDate: Date
    // , fromInstallDate: Date, toInstallDate: Date
    , selectedSellerId: string, selectedTechId: string, selectedCustomerName: string
    , selectedOrderStatus: string, selectedPaymentStatus: string): Observable<IOrderHeader[]> {

    let fromdatestring = formatDate(fromCreateDate, 'yyyy-MM-dd', 'en_US');
    let todatestring = formatDate(toCreateDate, 'yyyy-MM-dd', 'en_US');

    let searchParams = new HttpParams();
    searchParams = searchParams.append('fromCreateDate', fromdatestring);
    searchParams = searchParams.append('toCreateDate', todatestring);

    searchParams = searchParams.append('selectedSellerId', selectedSellerId);
    searchParams = searchParams.append('selectedTechId', selectedTechId);
    searchParams = searchParams.append('selectedCustomerName', selectedCustomerName);
    searchParams = searchParams.append('selectedOrderStatus', selectedOrderStatus);
    searchParams = searchParams.append('selectedPaymentStatus', selectedPaymentStatus);

    return this.httpClient.get<IOrderHeader[]>(`${environment.baseUrl}/Order`,
      {
        params: searchParams
      }
    )
  }

  getOrderById(id: number): Observable<IOrder> {
    return this.httpClient.get<IOrder>(`${environment.baseUrl}/Order/${id}`)
  }

  getOrderComms(id: number): Observable<ICommission[]> {
     let searchParams = new HttpParams();
    searchParams = searchParams.append('orderId', id);
    return this.httpClient.get<ICommission[]>(`${environment.baseUrl}/Order/GetOrderComms`,
      {
        params: searchParams,
        //responseType: 'text' as 'json' // Ensure the response is treated as JSON
      })
  }

  cancelOrder(id: number) {
    return this.httpClient.post<any>(`${environment.baseUrl}/order/CancelOrder`, id)
  }

  createOrder(order: IOrder): Observable<IOrder> {
    return this.httpClient.post<IOrder>(`${environment.baseUrl}/Order`, order)
  }

  updateOrder(order: IOrder): Observable<IOrder> {
    return this.httpClient.put<IOrder>(`${environment.baseUrl}/Order/${order.orderHeader.id}`, order)
  }

  // deleteOrder(id: number) {
  //   return this.httpClient.delete(`${environment.baseUrl}/Expense/${id}`)
  // }

}
