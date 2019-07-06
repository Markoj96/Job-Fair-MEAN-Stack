import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, ReactiveFormsModule, NgForm, FormControl } from '@angular/forms';
import { AdditionalService } from './../additional.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additional-add',
  templateUrl: './additional-add.component.html',
  styleUrls: ['./additional-add.component.css']
})
export class AdditionalAddComponent implements OnInit 
{
  additionalForm: FormGroup
  filePreview

  constructor(private additionalService: AdditionalService,private router:Router, private authService: AuthService, private builder: FormBuilder) { }

  ngOnInit() 
  {
    this.authService.checkUser().subscribe(
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

    this.additionalForm = this.builder.group({
      "Title": "",
      "Price": ""
    })
  }

  addAdditional()
  {
    this.additionalService.addAdditional(this.additionalForm.value)
      .subscribe(
        response => {          
          let additional = response
          this.router.navigate([`/additionals/show/${additional._id}`])
        },
        error => {
          window.location.reload()
        }
      )
  }
} 
