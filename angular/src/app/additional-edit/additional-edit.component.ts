import { AuthService } from './../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdditionalService } from './../additional.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-additional-edit',
  templateUrl: './additional-edit.component.html',
  styleUrls: ['./additional-edit.component.css']
})
export class AdditionalEditComponent implements OnInit {

  additionalForm: FormGroup
  id
  additionalData


  constructor(private additionalService: AdditionalService, private router: Router, private authService: AuthService, private builder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() 
  {
    this.authService.checkUser().subscribe(
      response => {
        this.route.params
          .subscribe(
            params => {
              this.id = params.id
              this.additionalService.getAdditional(this.id)
                .subscribe(response => {
                  this.additionalData = response
                  this.fillFormWithAdditional()
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

    this.additionalForm = this.builder.group({
      "Title": "",
      "Price": ""
    })
  }

  updateAdditional()
  {
    this.additionalService.updateAdditional(this.additionalForm.value, this.id)
      .subscribe(
        response => {
          this.router.navigate([`/additionals/show/${this.id}`])
        },
        error => {
          window.location.reload()
        }
      )
  }

  fillFormWithAdditional()
  {
    const Title = this.additionalForm.controls["Title"]
    Title.setValue(this.additionalData.Title)

    const Price = this.additionalForm.controls["Price"]
    Price.setValue(this.additionalData.Price)
  }
}
