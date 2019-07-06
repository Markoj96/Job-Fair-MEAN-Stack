import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from './../competition.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-competition-show',
  templateUrl: './competition-show.component.html',
  styleUrls: ['./competition-show.component.css']
})
export class CompetitionShowComponent implements OnInit {

  id:Number
  competition = { }
  todayDate: Date
  Username: String
  registered: Boolean = false
  letterType: String = "text"
  selectedFile: File
  coverLetterText: String

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute, private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() 
  {
    this.todayDate = new Date()

    this.authService.checkUser().subscribe(
      response => {
        this.route.params
          .subscribe(
            params => {
              this.id = params["id"]
              this.authService.getUsername()
                .subscribe(
                  response => {
                    this.Username = response.Username
                  },
                  error => {

                  }
                )
                
              this.competitionService.getCompetition(this.id)
                .subscribe(
                  response => {
                    this.competition = response
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

  registerIn(id, competition)
  {
    let data = null
    if(this.letterType == "text")
    {
      data = 
      {
        "Text": this.coverLetterText,
        "File": null
      }
    }
    else
    {
      data =
      {
        "Text": null,
        "File": this.selectedFile
      }
    }

    this.competitionService.registerIn(id, data)
      .subscribe(
        response => {
          this.registered = true
        },
        error => {
          this.registered = false
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
      {
        return true
      }
        
    return false
  }

  approveUser(id, competition)
  {
    this.competitionService.approveUser(id)
      .subscribe(
        response => {
          competition.Approved = true
        },
        error => {
        }
      )
  }
}
