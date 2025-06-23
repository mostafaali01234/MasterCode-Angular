import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user-auth.service';
import { IUserSelect, IUserEditInfo, IUserEditPassword } from '../../models/iuser';
import { environment } from '../../../environments/environment.development';
import { formatDate } from '@angular/common';
import { IUserBalance } from '../../models/iuser';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }

  getAllUsers(): Observable<IUserSelect[]> {
    return this.httpClient.get<IUserSelect[]>(`${environment.baseUrl}/Account/GetAllUsers`,
    )
  }

  getUserById(id: string): Observable<IUserEditInfo> {

    let searchParams = new HttpParams();
    searchParams = searchParams.append('id', id);
    return this.httpClient.get<IUserEditInfo>(`${environment.baseUrl}/Account/GetUserById`, {
      params: searchParams
    }
    )
  }

  updateUserData(user: IUserEditInfo): Observable<IUserEditInfo> {
    return this.httpClient.post<IUserEditInfo>(`${environment.baseUrl}/Account/EditUserData`, user)
  }

  updateUserPasswordAdmin(user: IUserEditPassword): Observable<IUserEditPassword> {
    console.log(user);
    return this.httpClient.post<IUserEditPassword>(`${environment.baseUrl}/Account/EditUserPasswordAdmin`, user)
  }

  updateUserPassword(user: IUserEditPassword): Observable<IUserEditPassword> {
    console.log(user);
    return this.httpClient.post<IUserEditPassword>(`${environment.baseUrl}/Account/EditUserPassword`, user)
  }

  getUserComms(empId: string, fromDate: Date, toDate: Date): Observable<IUserBalance[]> {
      let fromdatestring = formatDate(fromDate, 'yyyy-MM-dd', 'en_US');
    let todatestring = formatDate(toDate, 'yyyy-MM-dd', 'en_US');
    let searchParams = new HttpParams();
    searchParams = searchParams.append('empId', empId);
    searchParams = searchParams.append('fromDate', fromdatestring);
    searchParams = searchParams.append('toDate', todatestring);
    return this.httpClient.get<IUserBalance[]>(`${environment.baseUrl}/Account/GetEmpComms`,
      {
        params: searchParams,
      })
  }
}
