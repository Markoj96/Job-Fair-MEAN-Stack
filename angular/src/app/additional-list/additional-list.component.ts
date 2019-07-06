import { AuthService } from './../auth.service';
import { AdditionalService } from './../additional.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additional-list',
  templateUrl: './additional-list.component.html',
  styleUrls: ['./additional-list.component.css']
})
export class AdditionalListComponent implements OnInit {

  additionals = null

  constructor(private additionalService: AdditionalService, private authService: AuthService, private router: Router) { }

  ngOnInit() 
  {
    this.authService.checkUser().subscribe(
      response => {
        this.additionalService.getAdditionalList()
          .subscribe(
            response => {
              if(response.length > 0)
                this.additionals = response
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
