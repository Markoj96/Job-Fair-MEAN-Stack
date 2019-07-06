import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerURL = "http://localhost:3000/api/register"
  private loginURL = "http://localhost:3000/api/login"
  private logoutURL = "http://localhost:3000/api/logout"
  private changePasswordURL = "http://localhost:3000/api/change_password"
  private getUsernameURL = "http://localhost:3000/api/get_username"
  private checkUserURL = "http://localhost:3000/api/check_user"
  private getUserTypeURL = "http://localhost:3000/api/get_user_type"

  public userData = 
  {
    "Username": String,
    "Type": String
  }

  constructor(private http: HttpClient, private router: Router) 
  { 

  }

  registerUser(user)
  {
    return this.http.post<any>(this.registerURL, user)
  }

  loginUser(user)
  {
    return this.http.post<any>(this.loginURL, user)
  }

  logoutUser()
  {
    localStorage.removeItem("token")
    localStorage.removeItem("Type")
    localStorage.removeItem("Administrator")
    this.router.navigate(["/"])
  }

  changePassword(user)
  {
    return this.http.post<any>(this.changePasswordURL, user)
  }

  loggedIn()
  {
    //!! to return boolean value, not a token itself
    return !!localStorage.getItem("token")
  }

  getToken()
  {
    return localStorage.getItem("token")
  }

  checkUser()
  {
    let user =
    {
      "Token": localStorage.getItem("token"),
      "Type": localStorage.getItem("Type"),
      "Administrator": localStorage.getItem("Administrator")
    }
    return this.http.post<any>(this.checkUserURL, user)
  }

  getUsername()
  {
    let user = 
    { 
      "Token": localStorage.getItem("token")
    }
    return this.http.post<any>(this.getUsernameURL, user)
  }

  getUserType()
  {
    return localStorage.getItem("Type")
  }

  isStudent(): Boolean
  {
    let type = localStorage.getItem("Type")
    if(type == "Student")
    {
      return true
    }
    else
    {
      return false
    }
  }

  isCompany(): Boolean
  {
    let type = localStorage.getItem("Type")
    if(type == "Company")
    {
      return true
    }
    else
    {
      return false
    }
  }

  isAdministrator(): Boolean
  {
    let administrator = localStorage.getItem("Administrator")
    if(administrator == "true")
    {
      return true
    }
    else 
    {
      return false
    }
  }
}
