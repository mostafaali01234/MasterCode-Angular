import { HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { UserAuthService } from "../services/user-auth.service";
import { tap } from "rxjs";

export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn) {
    let modifiedReq = req;
    let _authService = new UserAuthService();

    // if (req.method == "POST") {
        modifiedReq = req.clone({
            //headers: req.headers.set("content-type", "application/json")
            headers: req.headers.set("Authorization", "Bearer " + _authService.getToken())
        });
    // }

    return next(modifiedReq)
        .pipe(
            tap((event) => {
                if (event.type == HttpEventType.Response) {
                    if (event.status == 401) {
                        _authService.logout();
                    }
                    else if (event.status == 200) {

                    }
                    else if (event.status == 500) {
                        console.log("Internal server error");
                    }
                }
            })
        );
}