import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  correctPassword:Boolean = true
  changeUserPasswordData = { }
  messageError
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  changePassword()
  {
    this.auth.changePassword(this.changeUserPasswordData)
    .subscribe(
      response => {
        this.router.navigate(["/login"])
      },
      error => {
        this.messageError = error.error.message
      }
    )
  }

  checkPassword(password):Boolean
  {
    if(password.length > 0)
    {
      let correct:Boolean = (this.checkLength(password) 
              && this.checkUpperCase(password) 
              && this.checkLowCase(password) 
              && this.checkNumber(password)
              && this.checkSpecialCharacters(password)
              && this.checkFirstLetter(password)
              && this.checkLettersInaRow(password))
      console.log(correct)
      if(correct)
        this.correctPassword = true
      else
        this.correctPassword = false      
      return correct
    }
    else
    {
      this.correctPassword = true
      return true
    }
  }

  checkLength(password):Boolean
  {
    if(password.length >= 8 && password.length <= 12) 
      return true
    else
      return false
  }

  checkUpperCase(password):Boolean
  {
    let count = 0
    for(let i = 0; i < password.length; i++)
    {
      if(password[i] == password[i].toUpperCase())
        count++
    }

    if(count >= 1)
      return true
    else
      return false
  }

  checkLowCase(password):Boolean
  {
    let count = 0
    for(let i = 0; i < password.length; i++)
    {
      if(password[i] == password[i].toLowerCase())
        count++
    }
    
    if(count >= 3)
      return true
    else
      return false
  }

  checkNumber(password):Boolean
  {
    let count = 0
    for(let i = 0; i < password.length; i++)
    {
      if(isNaN(password[i]))
        count++
    }
    
    if(count >= 1)
      return true
    else
      return false
  }

  checkSpecialCharacters(password):Boolean
  {
    let count = 0
    for(let i = 0; i < password.length; i++)
    {
      if((password[i] == '#') 
        || (password[i] == '*') 
        || (password[i] == '.') 
        || (password[i] == '!') 
        || (password[i] == '?') 
        || (password[i] == '$'))
        count++
    }
    
    if(count >= 1)
      return true
    else
      return false
  }

  checkFirstLetter(password):Boolean
  {
    return password[0].match(/[a-zA-Z]/)
  }

  checkLettersInaRow(password):Boolean
  {
    let count = 0
    for(let i = 0; i < password.length-1; i++)
    {
      if(password[i] == password[i + 1])
        return false
    }
    return true
  }
}
