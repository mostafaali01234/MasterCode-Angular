import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _UserAuthService =  inject(UserAuthService);
  let router = inject(Router);
  // console.log(_UserAuthService.isTokenExpired());

  // console.log(_UserAuthService.isUserLoggedIn());
  if (_UserAuthService.isUserLoggedIn() && !_UserAuthService.isTokenExpired()) { 
    return true;
  }
  else{
    // router.navigate(['Login']);
    // return false;
     try{
      _UserAuthService.refreshToken().subscribe((result) => {
        if (result) {
          router.navigate(['Home']);
          return true;
        } else {
          router.navigate(['Login']);
          return false;
        }
      });
    }
    catch{
        router.navigate(['Login']);
        return false;
    }
    return false;
  }
};
