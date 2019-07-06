import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private getSettingsURL = "http://localhost:3000/api/system_settings/get"
  private setSettingsURL = "http://localhost:3000/api/system_settings/set"
  constructor(private http: HttpClient) { }

  getSettings()
  {
    return this.http.get<any>(this.getSettingsURL)
  }
  
  setSettings(data)
  {
    return this.http.post<any>(this.setSettingsURL, data)
  }
}
