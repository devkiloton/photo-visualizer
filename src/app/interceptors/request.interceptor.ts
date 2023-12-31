import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    tokenService = inject(TokenService)
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.tokenService.hasToken()){
            const token = this.tokenService.getToken() ?? ''
            req = req.clone({
                setHeaders: {
                    'x-access-token': token
                }
            })
        }
        return next.handle(req)
    }

}