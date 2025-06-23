import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IUser } from '../models/iuser';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private authSubject: BehaviorSubject<boolean>;
  private readonly jwtHelper = new JwtHelperService();
  constructor(private httpClient: HttpClient) {
    this.authSubject = new BehaviorSubject<boolean>(false);
  }

  getAuthSubject(): BehaviorSubject<boolean> {
    return this.authSubject;
  }

  getToken(): string {
    return this.isUserLoggedIn() ? localStorage.getItem('token') || "" : "";
  }

  getRefreshToken(): string {
    return this.isUserLoggedIn() ? localStorage.getItem('refreshToken') || "" : "";
  }

  // Check if token is expired
  isTokenExpired(): boolean {
    const token = this.getToken();
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }

  refreshToken(): Observable<any> {
    const token = this.getRefreshToken();  
    const headers = new HttpHeaders({
      'content-type': `application/json`,
       'Authorization':  "Bearer " + this.getToken()
      
    });
    console.log(token);
    return this.httpClient.post<any>(`${environment.baseUrl}/Account/refresh-token`, `"${token}"`, { headers }).pipe(
        tap((result) => {
          console.log(result);
          localStorage.setItem('token', result.token);
          localStorage.setItem('refreshToken', result.refreshToken);
          this.authSubject.next(true);
        }),
        catchError((error) => {
          console.log(error);
          return of(null);
        })
      );
    }

  //   login(user: IUser) {
  //     return this.httpClient.post<any>(`${environment.baseUrl}/Account/login`, user)
  //         .pipe(tap(user => {
  //             // store user details and jwt token in local storage to keep user logged in between page refreshes
  //             localStorage.setItem('token', JSON.stringify(user));
  //             this.authSubject.next(true);
  //             return true;
  //         }));
  // }

  login(user: IUser): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/Account/login`, user).pipe(
      tap((result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('refreshToken', result.refreshToken);
        this.authSubject.next(true);
      }),
      catchError((error) => {
        console.log(error);
        return of(null);
      })
    );


    // return this.httpClient.post<any>(`${environment.baseUrl}/Account/login`, user)
    //   .pipe(
    //     tap((result) => {
    //         localStorage.setItem('token', result.token);
    //         this.authSubject.next(true);
    //         return true;
    //     })
    //   );
  }

  // login(user: IUser): Observable<boolean> {
  //   return this.httpClient.post<any>(`${environment.baseUrl}/Account/login`, user).pipe(
  //     map((result) => {
  //       localStorage.setItem('token', result.token);
  //       this.authSubject.next(true);
  //       return true;
  //     }),
  //     catchError((error) => {
  //       console.log(error);
  //       return of(false);
  //     })
  //   );
  // }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.authSubject.next(false);
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }


  // Get the current user's claims
  getCurrentUserClaims(): any {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return this.jwtHelper.decodeToken(token); // Decode JWT to get claims
    }
    return null;
  }

  // Get specific claim
  getClaim(claim: string): any {
    const claims = this.getCurrentUserClaims();
    return claims ? claims[claim] : null;
  }

  // Get specific claim
  getCurrentUserRole(): any {
    const role = this.getClaim('http://schemas.microsoft.com/ws/2008/06/identity/claims/role');
    return role ? role : null;
  }
}
