import { AuthService } from './../auth.service';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-home',
  templateUrl: './student-search.component.html',
  styleUrls: ['./student-search.component.css']
})
export class StudentSearchComponent implements OnInit {

  constructor(private auth: AuthService, private studentService: StudentService, private router: Router) { }

  CompanyName = ""
  CompetitionTitle = ""
  JobSearch = false
  InternshipSearch = false
  searchResult
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

  searchCompanyAndCompetition()
  {
    let searchData =
    {
      CompanyName: this.CompanyName,
      CompetitionTitle: this.CompetitionTitle,
      JobSearch: this.JobSearch,
      InternshipSearch: this.InternshipSearch
    }
    
    this.studentService.search(searchData)
      .subscribe(
        response => 
        {
          this.searchResult = response
        },
        error => {
          
        }
      )
  }
}
