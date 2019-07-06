import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit 
{

  user_type = 'Student'
  correctPassword:Boolean = true
  registerUserData = { }
  errorUsernameTaken: String = null
  errorEmailTaken: String = null

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() 
  {

  }

  registerUser() 
  {
    this.auth.registerUser(this.registerUserData)
    .subscribe(
      response => {
        localStorage.setItem("token", response.Token)
        localStorage.setItem("Type", this.user_type)
        localStorage.setItem("Administrator", "false")
        this.router.navigate(["/"])
      },
      error => {
        this.errorUsernameTaken = error.error.UsernameTaken
        this.errorEmailTaken = error.error.EmailTaken
      }
    )
  }

  checkPassword(password):Boolean
  {
    if(password != undefined)
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
      if(!isNaN(password[i]))
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