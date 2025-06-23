import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user-auth.service';
import { IExpenseType } from '../../models/iexpenseType';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiExpenseTypeService {

  constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }
    
      getAllExpensesType(): Observable<IExpenseType[]> {
        return this.httpClient.get<IExpenseType[]>(`${environment.baseUrl}/ExpenseType`,
        )
      } 
    
      getExpenseTypeById(id: number): Observable<IExpenseType> {
        return this.httpClient.get<IExpenseType>(`${environment.baseUrl}/ExpenseType/${id}`)
      }
    
    
      createExpenseType(expenseType: IExpenseType): Observable<IExpenseType> {
        return this.httpClient.post<IExpenseType>(`${environment.baseUrl}/ExpenseType`, expenseType)
      }
    
      updateExpenseType(expenseType: IExpenseType): Observable<IExpenseType> {
        return this.httpClient.put<IExpenseType>(`${environment.baseUrl}/ExpenseType/${expenseType.id}`, expenseType)
      }
    
      deleteExpenseType(id: number) {
        return this.httpClient.delete(`${environment.baseUrl}/ExpenseType/${id}`)
      }
    
}
