import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = { }
  errorMessage = { }
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() 
  {
    this.auth.loginUser(this.loginUserData)
    .subscribe(
      response => {
        localStorage.setItem("token", response.Token)
        localStorage.setItem("Type", response.Type)
        localStorage.setItem("Administrator", response.Administrator)
        this.router.navigate(["/"])
      },
      error => {
        this.errorMessage = error.error.message
      }
    )
  }
}
