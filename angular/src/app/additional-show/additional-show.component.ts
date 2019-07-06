import { HttpErrorResponse } from '@angular/common/http';
import { AdditionalService } from './../additional.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-additional-show',
  templateUrl: './additional-show.component.html',
  styleUrls: ['./additional-show.component.css']
})
export class AdditionalShowComponent implements OnInit {

  additional = null
  id
  constructor(private router:Router, private route: ActivatedRoute, private authService: AuthService, private additionalService: AdditionalService) { }

  ngOnInit() 
  {
    this.authService.checkUser().subscribe(
      response => {
        this.route.params
          .subscribe(
            params => {
              this.id = params["id"]

              this.additionalService.getAdditional(this.id)
                .subscribe(
                  response => {
                    this.additional = response
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
