import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurriculumVitaeService {

  private cvURL = "http://localhost:3000/api/curriculum_vitae"
  private updateCVURL = "http://localhost:3000/api/curriculum_vitae_update"
  private systemSettingsURL = "http://localhost:3000/api/system_settings/get"
  constructor(private http: HttpClient) { }

  getCV(username)
  {
    let body =
    {
      "Username": username
    }
    return this.http.post<any>(this.cvURL, body)
  }

  getCVByID(id)
  {
    return this.http.get<any>(`${this.cvURL}/show/${id}`)
  }

  saveCV(userData)
  {
    return this.http.post<any>(this.updateCVURL, userData)
  }

  cvEnabled()
  {
    return this.http.get<any>(this.systemSettingsURL)
  }
}
