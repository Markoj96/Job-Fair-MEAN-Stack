import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate 
{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate()
  {
    if(this.authService.isAdministrator())
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
