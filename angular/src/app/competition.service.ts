import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private addCompetitionURL = "http://localhost:3000/api/competitions/add"
  private showCompetitionURL = "http://localhost:3000/api/competitions/show"
  private listCompanyCompetitionURL = "http://localhost:3000/api/competitions/company_list"
  private listStudentCompetitionURL = "http://localhost:3000/api/competitions/student_list"
  private registerURL = "http://localhost:3000/api/competitions/register"
  private approveUserURL = "http://localhost:3000/api/competitions/approve"

  constructor(private http: HttpClient) { }

  addCompetition(competitionData)
  {
    return this.http.post<any>(this.addCompetitionURL, competitionData)
  }

  getCompetition(id)
  {
    return this.http.get<any>(`${this.showCompetitionURL}/${id}`)
  }

  getCompanyCompetitionList()
  {
    let userData = 
    {
      "Token": localStorage.getItem("token")
    }
    return this.http.post<any>(this.listCompanyCompetitionURL, userData)
  }

  getStudentCompetitionList()
  {
    let userData = 
    {
      "Token": localStorage.getItem("token")
    }
    return this.http.post<any>(this.listStudentCompetitionURL, userData)
  }

  registerIn(id, data)
  {
    let userData = 
    {
      "Token": localStorage.getItem("token"),
      "coverLetter": data
    }
    return this.http.post<any>(`${this.registerURL}/${id}`, userData)
  }

  approveUser(id)
  {
    let userData = 
    {
      "Token": localStorage.getItem("token")
    }
    return this.http.post<any>(`${this.approveUserURL}/${id}`, userData)
  }
}