import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user-auth.service';
import { ICustomer, ICustomerMoves, ICustomerMovesReturnList } from '../../models/icustomer';
import { environment } from '../../../environments/environment.development';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiCustomerService {

  constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }
  
    getAllCustomers(): Observable<ICustomer[]> {
      return this.httpClient.get<ICustomer[]>(`${environment.baseUrl}/Customer`,
      )
    } 
  
    getAllCustomerMoves(id: number, fromDate: Date, toDate: Date): Observable<ICustomerMovesReturnList> {
      let fromdatestring = formatDate(fromDate, 'yyyy-MM-dd', 'en_US');
      let todatestring = formatDate(toDate, 'yyyy-MM-dd', 'en_US');

      let searchParams = new HttpParams();
      searchParams = searchParams.append('fromDate', fromdatestring);
      searchParams = searchParams.append('toDate', todatestring);
      return this.httpClient.get<ICustomerMovesReturnList>(`${environment.baseUrl}/Customer/GetCustomerMoves/${id}`,{
        params: searchParams
      })
    } 
  
    getCustomerById(id: number): Observable<ICustomer> {
      return this.httpClient.get<ICustomer>(`${environment.baseUrl}/Customer/${id}`)
    }
  
  
    getCustomerNamePhone(searchText: string): Observable<ICustomer> {
      return this.httpClient.get<ICustomer>(`${environment.baseUrl}/Customer/GetCustomerNamePhone`,{
        params: new HttpParams().set('searchText', searchText)
      })
    }
  
  
    createCustomer(cat: ICustomer): Observable<ICustomer> {
      console.log(cat);
      return this.httpClient.post<ICustomer>(`${environment.baseUrl}/Customer`, cat)
    }
  
    updateCustomer(cat: ICustomer): Observable<ICustomer> {
      return this.httpClient.put<ICustomer>(`${environment.baseUrl}/Customer/${cat.id}`, cat)
    }
  
    deleteCustomer(id: number) {
      return this.httpClient.delete(`${environment.baseUrl}/Customer/${id}`)
    }
  
}
