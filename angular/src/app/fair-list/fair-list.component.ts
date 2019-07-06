import { CurriculumVitaeService } from './../curriculum-vitae.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { FairService } from './../fair.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fair-list',
  templateUrl: './fair-list.component.html',
  styleUrls: ['./fair-list.component.css']
})
export class FairListComponent implements OnInit {
  fairs = null
  activeFair = false
  systemSettings = { }

  constructor(private fairService: FairService, private cvService: CurriculumVitaeService, private authService: AuthService, private router: Router) { }

  ngOnInit() 
  {
    this.authService.checkUser().subscribe(
      response => {
        this.fairService.getFairList()
          .subscribe(
            response => {
              if(response.length > 0)
              {
                this.fairs = response
                let i = 0
                let date = new Date()
                let convertedTime = date.toISOString().substring(11, 19).split(":")

                for(i = 0; i < this.fairs.length; i++)
                {
                  let hours = this.fairs[0].EndTime.split("/")[0]
                  let minutes = this.fairs[0].EndTime.split("/")[1]
                  let seconds = this.fairs[0].EndTime.split("/")[2]

                  if(Date.parse(date.toString()) == Date.parse(this.fairs[0].EndDate.toString()))
                  {
                    if(convertedTime[0] <= hours && convertedTime[1] < minutes)  
                    {
                      this.activeFair = true
                    }
                  }
                  if(Date.parse(date.toString()) < Date.parse(this.fairs[0].EndDate.toString()))
                  {
                    this.activeFair = true
                  }
                }
              }
            }
          )
        this.cvService.cvEnabled()
          .subscribe(
            response =>
            {
              this.systemSettings = response
              console.log(this.systemSettings)
            },
            error =>
            {
              if(error instanceof HttpErrorResponse)
              {
                console.log(error)
              }
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
