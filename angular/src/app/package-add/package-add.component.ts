import { AuthService } from './../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { PackageService } from './../package.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-package-add',
  templateUrl: './package-add.component.html',
  styleUrls: ['./package-add.component.css']
})

export class PackageAddComponent implements OnInit {

  packageForm: FormGroup

  constructor(private packageService: PackageService,private router:Router, private authService: AuthService, private builder: FormBuilder) { }

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

    this.packageForm = this.builder.group({
      "Title": "",
      "Contents": this.builder.array([]),
      "VideoPromotion": "",
      "NoLessons": "",
      "NoWorkchops": "",
      "NoPresentation": "",
      "Price": "",
      "MaxCompanies": ""
    })
  }

  initContent()
  {
      return this.builder.group({
        "Content": ""
      })
  }

  addContent()
  {
    const control = <FormArray>this.packageForm.controls["Contents"];
    control.push(this.initContent())
  }

  removeContent(i: number)
  {
    const control = <FormArray>this.packageForm.controls["Contents"];
    control.removeAt(i);
  }

  addPackage()
  {
    this.packageService.addPackage(this.packageForm.value)
      .subscribe(
        response => {
          console.log(response)
          let newPackage = response
          this.router.navigate([`/packages/show/${newPackage._id}`])
        },
        error => {
          window.location.reload()
        }
      )
  }
}
