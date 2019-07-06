import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { PackageService } from '../package.service';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css']
})
export class PackageListComponent implements OnInit {

  packages = null

  constructor(private packageService: PackageService, private authService: AuthService, private router: Router) { }

  ngOnInit() 
  {
    this.authService.checkUser().subscribe(
      response => {
        this.packageService.getPackageList()
          .subscribe(
            response => {
              if(response.length > 0)
                this.packages = response
            }
          )
      },
      error => {
        if(error instanceof HttpErrorResponse)
        {
          if(error.status === 401 || error.status === 404)
          {
            localStorage.removeItem("token")
            localStorage.removeItem("Type")
            localStorage.removeItem("Administrator")
            this.router.navigate(["/login"])
          }
        }
      }
    )
  }
}