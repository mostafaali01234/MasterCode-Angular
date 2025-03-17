import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { IProduct } from '../models/iproduct';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {

  constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.baseUrl}/products`,
      //   {
      //   headers: new HttpHeaders({
      //     "authorization": this._userAuthService.getToken()
      //   })
      // }
    )
  }

  getProductById(id: number): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`${environment.baseUrl}/products/${id}`)
  }

  getProductsByCatId(catId: number): Observable<IProduct[]> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('catId', catId);
    searchParams = searchParams.append('limit', 10);

    return this.httpClient.get<IProduct[]>(`${environment.baseUrl}/products`, {
      params: searchParams
    })
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.post<IProduct>(`${environment.baseUrl}/products`, product)
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.httpClient.put<IProduct>(`${environment.baseUrl}/products/${product.id}`, product)
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/products/${id}`)
  }

}
