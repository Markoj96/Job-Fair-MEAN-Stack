import { HttpClient } from '@angular/common/http';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AdditionalService {

  private getAdditionalsURL = "http://localhost:3000/api/additionals/list"
  private addAdditionalURL = "http://localhost:3000/api/additionals/add"
  private showAdditionalURL = "http://localhost:3000/api/additionals/show"
  private updateAdditionalURL = "http://localhost:3000/api/additionals/update"
  
  constructor(private http: HttpClient) { }

  getAdditionalList()
  {
    return this.http.get<any>(this.getAdditionalsURL)
  }

  getAdditional(id)
  {
    return this.http.get<any>(`${this.showAdditionalURL}/${id}`)
  }

  addAdditional(data)
  {
    return this.http.post<any>(this.addAdditionalURL, data)
  }

  updateAdditional(data, id)
  {
    return this.http.post<any>(`${this.updateAdditionalURL}/${id}`, data)
  }
}
