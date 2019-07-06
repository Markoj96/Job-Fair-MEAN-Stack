import { AuthService } from './../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CompetitionService } from './../competition.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css']
})
export class CompetitionListComponent implements OnInit {

  competitions = null
  Type:String = null
  Username:String
  todayDate:Date

  constructor(private competitionService: CompetitionService, private router: Router, private authService: AuthService) { }

  ngOnInit() 
  {
    this.todayDate = new Date()

    this.authService.checkUser().subscribe(
      response => {
        this.authService.getUsername()
          .subscribe(
            response => {
              this.Username = response.Username
            },
            error => {

            }
          )

        this.Type = localStorage.getItem("Type")
        if(this.Type == "Company")
        {
          this.competitionService.getCompanyCompetitionList().subscribe(
            response => {
              this.competitions = response
            },
            error => {
              console.log(error)
            }
          )
        }
        else
        {
          this.competitionService.getStudentCompetitionList().subscribe(
            response => {
              this.competitions = response
            },
            error => {
              console.log(error)
            }
          )
        }
        
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

  compareDates(date1, date2): boolean
  {
    if(date1 < new Date(date2))
    {
      return true
    }
    else
    {
      return false
    }
  }

  isUserRegistered(registered_users, username): boolean
  {
    let i: number
    for(i = 0; i < registered_users.length; i++)
      if(registered_users[i].Username == username)
        return true
        
    return false
  }

  isUserApproved(registered_users, username): boolean
  {
    let i: number
    for(i = 0; i < registered_users.length; i++)
      if(registered_users[i].Username == username)
      {
        if(registered_users[i].Approved == true)
          return true
        else 
          return false
      }
        
    return false
  }

}
