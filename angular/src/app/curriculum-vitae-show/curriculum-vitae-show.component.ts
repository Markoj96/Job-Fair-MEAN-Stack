import { CurriculumVitaeService } from './../curriculum-vitae.service';
import { AuthService } from './../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curriculum-vitae-show',
  templateUrl: './curriculum-vitae-show.component.html',
  styleUrls: ['./curriculum-vitae-show.component.css']
})
export class CurriculumVitaeShowComponent implements OnInit {

  id: Number
  cv = null
  constructor(private authService: AuthService, private router: Router, private cvService: CurriculumVitaeService, private route: ActivatedRoute) { }

  ngOnInit() 
  {
    this.authService.checkUser().subscribe(
      response => {
        this.route.params.subscribe(params => {
          this.id = params["id"]
          this.cvService.getCVByID(this.id)
            .subscribe(
              response => {
                this.cv = response
              },
              error => {
    
              }
            )
        })
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
