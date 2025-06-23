import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user-auth.service';
import { ILoan } from '../../models/iloan';
import { environment } from '../../../environments/environment.development';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ApiLoanService {

  constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }

  getAllLoansOld(): Observable<ILoan[]> {
    return this.httpClient.get<ILoan[]>(`${environment.baseUrl}/Loan`,
    )
  }


  getAllLoans(fromDate: Date, toDate: Date, selectedEmpId: string): Observable<ILoan[]> {
    let fromdatestring = formatDate(fromDate, 'yyyy-MM-dd', 'en_US');
    let todatestring = formatDate(toDate, 'yyyy-MM-dd', 'en_US');
    let searchParams = new HttpParams();
    searchParams = searchParams.append('fromDate', fromdatestring);
    searchParams = searchParams.append('toDate', todatestring);
    searchParams = searchParams.append('selectedEmpId', selectedEmpId);
    return this.httpClient.get<ILoan[]>(`${environment.baseUrl}/Loan`,
      {
        params: searchParams
      }
    )
  }


  getLoanById(id: number): Observable<ILoan> {
    return this.httpClient.get<ILoan>(`${environment.baseUrl}/Loan/${id}`)
  }


  createLoan(loan: ILoan): Observable<ILoan> {
    return this.httpClient.post<ILoan>(`${environment.baseUrl}/Loan`, loan)
  }

  updateLoan(loan: ILoan): Observable<ILoan> {
    return this.httpClient.put<ILoan>(`${environment.baseUrl}/Loan/${loan.id}`, loan)
  }

  deleteLoan(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/Loan/${id}`)
  }
}