import { AuthService } from './../auth.service';
import { FairService } from './../fair.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { NgForm, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper'

@Component({
  selector: 'app-fair-add',
  templateUrl: './fair-add.component.html',
  styleUrls: ['./fair-add.component.css']
})
export class FairAddComponent implements OnInit {

  fairFile = null
  packageFile = null

  formStep1: FormGroup
  formStep2: FormGroup
  formStep3: FormGroup

  fair = null
  package = null

  constructor(private fairService: FairService, private router:Router, private authService: AuthService, private builder: FormBuilder) { }

  ngOnInit() 
  {
    this.formStep1 = this.builder.group({
      "FairFile": ["", Validators.required]
    })

    this.formStep2 = this.builder.group({
      "PackageFile": ["", Validators.required] 
    })

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
  }

  onFile1Change(event)
  {
    this.fairFile = event.target.files[0]

    const fileReader = new FileReader()
    fileReader.onload = () => {
      try
      {
        let fileContent = fileReader.result
        let jsonFile = JSON.parse(fileContent.toString())
        this.fair = jsonFile
      }
      catch(e)
      {
        this.fairFile = null
      }
      
    }

    fileReader.readAsText(this.fairFile)
  }

  onFile2Change(event)
  {
    this.packageFile = event.target.files[0]

    const fileReader = new FileReader()
    fileReader.onload = () => {
      try
      {
        let fileContent = fileReader.result
        let jsonFile = JSON.parse(fileContent.toString())
        this.package = jsonFile
      }
      catch(e)
      {
        this.packageFile = null
      }
      
    }

    fileReader.readAsText(this.packageFile)
  }

  addFair()
  {
    this.fairService.addFair(this.fair)
      .subscribe(
        response => {
          this.fairService.addPackage(this.package)
            .subscribe(
              respone => {
                this.router.navigate([`/fairs/list/`])
              },
              error => {

              }
            )
        },
        error => {

        }
      )
  }
}