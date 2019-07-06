import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate 
{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean
  {
    if(this.authService.isStudent())
    {
      return true
    }
    else
    {
      this.router.navigate(["/login"])
      return false
    }
  }
}
