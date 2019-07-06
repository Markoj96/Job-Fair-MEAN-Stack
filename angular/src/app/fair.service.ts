import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FairService {

  private addFairURL = "http://localhost:3000/api/fairs/add-fair"
  private addPackageURL = "http://localhost:3000/api/fairs/add-package"
  private getFairURL = "http://localhost:3000/api/fairs/list"
  private showFairURL = "http://localhost:3000/api/fairs/show"

  constructor(private http: HttpClient) { }

  addFair(data)
  {
    return this.http.post<any>(this.addFairURL, data)
  }
  
  addPackage(data)
  {
    return this.http.post<any>(this.addPackageURL, data)
  }

  getFairList()
  {
    return this.http.get<any>(this.getFairURL)
  }

  getFair(id)
  {
    return this.http.get<any>(`${this.showFairURL}/${id}`)
  }


}
