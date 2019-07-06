import { AuthService } from './../auth.service';
import { FairService } from './../fair.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fair-show',
  templateUrl: './fair-show.component.html',
  styleUrls: ['./fair-show.component.css']
})
export class FairShowComponent implements OnInit {

  fair = null
  id
  constructor(private router:Router, private route: ActivatedRoute, private authService: AuthService, private fairService: FairService) { }

  ngOnInit() 
  {
    this.authService.checkUser().subscribe(
      response => {
        this.route.params
          .subscribe(
            params => {
              this.id = params["id"]

              this.fairService.getFair(this.id)
                .subscribe(
                  response => {
                    this.fair = response
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