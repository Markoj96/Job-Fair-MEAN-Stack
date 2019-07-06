import { PackageService } from './../package.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-package-show',
  templateUrl: './package-show.component.html',
  styleUrls: ['./package-show.component.css']
})
export class PackageShowComponent implements OnInit {

  package = null
  id
  constructor(private router:Router, private route: ActivatedRoute, private authService: AuthService, private packageService: PackageService) { }

  ngOnInit() 
  {
    this.authService.checkUser().subscribe(
      response => {
        this.route.params
          .subscribe(
            params => {
              this.id = params["id"]

              this.packageService.getPackage(this.id)
                .subscribe(
                  response => {
                    this.package = response
                  },
                  error => {
                    
                  }
                )
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