import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IOrderDetail } from '../../models/iorder';
import { UserAuthService } from '../user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }


  getAllCart(): Observable<IOrderDetail[]> {
    return this.httpClient.get<IOrderDetail[]>(`${environment.baseUrl}/ShoppingCart`
    )
  }

  addToCart(cartItem: IOrderDetail): Observable<IOrderDetail[]> {
    return this.httpClient.post<IOrderDetail[]>(`${environment.baseUrl}/ShoppingCart`, cartItem)
  }


  updateCartItem(item: IOrderDetail): Observable<IOrderDetail> {
    return this.httpClient.put<IOrderDetail>(`${environment.baseUrl}/ShoppingCart/${item.id}`, item)
  }

  deleteOneCart(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/ShoppingCart/${id}`)
  }

  deleteAllCart() {
    return this.httpClient.delete(`${environment.baseUrl}/ShoppingCart`)
  }

}
