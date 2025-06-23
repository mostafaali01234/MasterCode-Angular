import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user-auth.service';
import { IExpense } from '../../models/iexpense';
import { environment } from '../../../environments/environment.development';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiExpenseService {

  constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }


  getAllExpenses(fromDate: Date, toDate: Date, selectedEmpId: string, selectedExpenseTypeId: number): Observable<IExpense[]> {
    let fromdatestring = formatDate(fromDate, 'yyyy-MM-dd', 'en_US');
    let todatestring = formatDate(toDate, 'yyyy-MM-dd', 'en_US');
    let searchParams = new HttpParams();
    searchParams = searchParams.append('fromDate', fromdatestring);
    searchParams = searchParams.append('toDate', todatestring);
    searchParams = searchParams.append('selectedEmpId', selectedEmpId);
    searchParams = searchParams.append('selectedExpenseTypeId', selectedExpenseTypeId);
    return this.httpClient.get<IExpense[]>(`${environment.baseUrl}/Expense`,
      {
        params: searchParams
      }
    )
  }

  getExpenseById(id: number): Observable<IExpense> {
    return this.httpClient.get<IExpense>(`${environment.baseUrl}/Expense/${id}`)
  }


  createExpense(expense: IExpense): Observable<IExpense> {
    return this.httpClient.post<IExpense>(`${environment.baseUrl}/Expense`, expense)
  }

  updateExpense(expense: IExpense): Observable<IExpense> {
    return this.httpClient.put<IExpense>(`${environment.baseUrl}/Expense/${expense.id}`, expense)
  }

  deleteExpense(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/Expense/${id}`)
  }

}
