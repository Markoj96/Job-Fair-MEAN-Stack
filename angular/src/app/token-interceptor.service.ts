import { AuthService } from './auth.service';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  //Next - next to pass execution
  intercept(request, next)
  {
    let userType = localStorage.getItem("Type")

    let authService = this.injector.get(AuthService)
    let tokenizedRequest = request.clone({
      setHeaders:
      {
        authorization: `Bearer ${authService.getToken()}`
      }    
    })
    
    return next.handle(tokenizedRequest)
  }
}
