import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log(sessionStorage.getItem("token"))

    return next.handle(request).pipe(tap((res:any)=>{
      // console.log(typeof res,res)
      // // if(typeof res == HttpResponse){
      //   sessionStorage.setItem("token",res.body.token)
      // // }
    }))
      
  }
}
