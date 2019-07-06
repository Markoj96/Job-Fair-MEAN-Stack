import { AuthService } from './../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PackageService } from '../package.service';
import { NgForm, ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-package-edit',
  templateUrl: './package-edit.component.html',
  styleUrls: ['./package-edit.component.css']
})
export class PackageEditComponent implements OnInit {

  packageForm: FormGroup
  id
  packageData


  constructor(private packageService: PackageService,private router: Router, private authService: AuthService, private builder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() 
  {
    this.authService.checkUser().subscribe(
      response => {
        this.route.params
          .subscribe(
            params => {
              this.id = params.id
              this.packageService.getPackage(this.id)
                .subscribe(response => {
                  this.packageData = response
                  this.fillFormWithPackage()
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

  initContent(Content?: any)
  {
    if(Content)
    {
      return this.builder.group({
        "Content": Content
      })  
    }
    else 
    {
      return this.builder.group({
        "Content": ""
      })
    }  
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

  updatePackage()
  {
    this.packageService.updatePackage(this.packageForm.value, this.id)
      .subscribe(
        response => {
          this.router.navigate([`/packages/show/${this.id}`])
        },
        error => {
          window.location.reload()
        }
      )
  }

  fillFormWithPackage()
  {
    const Title = this.packageForm.controls["Title"]
    Title.setValue(this.packageData.Title)

    const VideoPromotion = this.packageForm.controls["VideoPromotion"]
    VideoPromotion.setValue(this.packageData.VideoPromotion)

    const NoLessons = this.packageForm.controls["NoLessons"]
    NoLessons.setValue(this.packageData.NoLessons)

    const NoWorkchops = this.packageForm.controls["NoWorkchops"]
    NoWorkchops.setValue(this.packageData.NoWorkchops)

    const NoPresentation = this.packageForm.controls["NoPresentation"]
    NoPresentation.setValue(this.packageData.NoPresentation)

    const Price = this.packageForm.controls["Price"]
    Price.setValue(this.packageData.Price)

    const MaxCompanies = this.packageForm.controls["MaxCompanies"]
    MaxCompanies.setValue(this.packageData.MaxCompanies)

    const Contents = <FormArray>this.packageForm.controls["Contents"]
    for(let i = 0; i < this.packageData.Contents.length; i++)
    {
      Contents.push(this.initContent(this.packageData.Contents[i].Content))
    }
  }
}
