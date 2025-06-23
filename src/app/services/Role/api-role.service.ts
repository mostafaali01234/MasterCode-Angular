import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user-auth.service';
import { IRole } from '../../models/ijob';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiRoleService {

   constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }
  
    getAllRoles(): Observable<IRole[]> {
      return this.httpClient.get<IRole[]>(`${environment.baseUrl}/Account/GetAllRoles`,
      )
    } 
  
    createRole(role: IRole): Observable<IRole> {
      return this.httpClient.post<IRole>(`${environment.baseUrl}/Account/CreateRole`, role)
    }
  
    deleteRole(id: string) {
      return this.httpClient.delete(`${environment.baseUrl}/Account/DeleteRole/${id}`)
    }
}
