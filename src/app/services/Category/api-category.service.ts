import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user-auth.service';
import { ICategory } from '../../models/icategory';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoryService {

  constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }

  getAllCategories(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(`${environment.baseUrl}/Category`,
    )
  } 

  getCategoryById(id: number): Observable<ICategory> {
    return this.httpClient.get<ICategory>(`${environment.baseUrl}/Category/${id}`)
  }


  createCategory(cat: ICategory): Observable<ICategory> {
    return this.httpClient.post<ICategory>(`${environment.baseUrl}/Category`, cat)
  }

  updateCategory(cat: ICategory): Observable<ICategory> {
    return this.httpClient.put<ICategory>(`${environment.baseUrl}/Category/${cat.id}`, cat)
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/Category/${id}`)
  }


  
}
