import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user-auth.service';
import { IMoneysafe, IMoneysafeMoves, IMoneysafeMovesReturnList } from '../../models/imoneysafe';
import { environment } from '../../../environments/environment.development';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiMoneysafeService {

  constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }

  getAllMoneysafes(): Observable<IMoneysafe[]> {
    return this.httpClient.get<IMoneysafe[]>(`${environment.baseUrl}/Moneysafe`,
    )
  }

  getAllMoneysafeMoves(id: number, fromDate: Date, toDate: Date): Observable<IMoneysafeMovesReturnList> {
    let fromdatestring = formatDate(fromDate, 'yyyy-MM-dd', 'en_US');
    let todatestring = formatDate(toDate, 'yyyy-MM-dd', 'en_US');

    let searchParams = new HttpParams();
    searchParams = searchParams.append('fromDate', fromdatestring);
    searchParams = searchParams.append('toDate', todatestring);
    return this.httpClient.get<IMoneysafeMovesReturnList>(`${environment.baseUrl}/Moneysafe/GetMoneysafeMoves/${id}`, {
      params: searchParams
    })
  }

  getMoneysafeById(id: number): Observable<IMoneysafe> {
    return this.httpClient.get<IMoneysafe>(`${environment.baseUrl}/Moneysafe/${id}`)
  }


  createMoneysafe(cat: IMoneysafe): Observable<IMoneysafe> {
    console.log(cat);
    return this.httpClient.post<IMoneysafe>(`${environment.baseUrl}/Moneysafe`, cat)
  }

  updateMoneysafe(cat: IMoneysafe): Observable<IMoneysafe> {
    return this.httpClient.put<IMoneysafe>(`${environment.baseUrl}/Moneysafe/${cat.id}`, cat)
  }

  deleteMoneysafe(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/Moneysafe/${id}`)
  }
}
