import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../auth.service';
import { CompetitionService } from './../competition.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competition-add',
  templateUrl: './competition-add.component.html',
  styleUrls: ['./competition-add.component.css']
})
export class CompetitionAddComponent implements OnInit {

  competitionData = { }
  username = { }
  constructor(private competitionService: CompetitionService, private auth: AuthService, private router: Router) { }

  ngOnInit() 
  {
    this.auth.checkUser().subscribe(
      response => {

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

  addCompetition()
  {
    this.competitionData["Token"] = localStorage.getItem("token")
    this.competitionService.addCompetition(this.competitionData)
      .subscribe(
        response => {
          let competition = response
          this.router.navigate([`/competitions/show/${competition._id}`])
        },
        error => {

        }
      )
  }
}
