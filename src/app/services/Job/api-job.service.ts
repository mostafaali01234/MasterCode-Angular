import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuthService } from '../user-auth.service';
import { IJob } from '../../models/ijob';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiJobService {

  constructor(private httpClient: HttpClient, private _userAuthService: UserAuthService) { }

  getAllJobs(): Observable<IJob[]> {
    return this.httpClient.get<IJob[]>(`${environment.baseUrl}/Job`,
    )
  } 

  getJobById(id: number): Observable<IJob> {
    return this.httpClient.get<IJob>(`${environment.baseUrl}/Job/${id}`)
  }


  createJob(job: IJob): Observable<IJob> {
    return this.httpClient.post<IJob>(`${environment.baseUrl}/Job`, job)
  }

  updateJob(job: IJob): Observable<IJob> {
    return this.httpClient.put<IJob>(`${environment.baseUrl}/Job/${job.id}`, job)
  }

  deleteJob(id: number) {
    return this.httpClient.delete(`${environment.baseUrl}/Job/${id}`)
  }


}
