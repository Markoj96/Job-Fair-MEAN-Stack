import { SettingsService } from './../settings.service';
import { AuthService } from './../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings = null
  CV_Enabled
  Fair_Enabled

  constructor(private authService: AuthService, private router: Router, private settingsService: SettingsService) { }

  ngOnInit() 
  {
    this.authService.checkUser().subscribe(
      response => {
        this.settingsService.getSettings()
          .subscribe(
            response => {
            this.settings = response
            this.CV_Enabled = this.settings.CV_Enabled
            this.Fair_Enabled = this.settings.Fair_Enabled
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

  saveSettings()
  {
    let data =
    {
      "CV_Enabled": this.CV_Enabled,
      "Fair_Enabled": this.Fair_Enabled
    }
    this.settingsService.setSettings(data)
      .subscribe(
        response => {
          window.location.reload()
        },
        error => {
          
        }
      )
  }
}