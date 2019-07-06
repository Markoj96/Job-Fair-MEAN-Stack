import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private getPackagesURL = "http://localhost:3000/api/packages/list"
  private addPackageURL = "http://localhost:3000/api/packages/add"
  private showPackageURL = "http://localhost:3000/api/packages/show"
  private updatePackageURL = "http://localhost:3000/api/packages/update"

  constructor(private http: HttpClient) { }

  getPackageList()
  {
    return this.http.get<any>(this.getPackagesURL)
  }

  getPackage(id)
  {
    return this.http.get<any>(`${this.showPackageURL}/${id}`)
  }

  addPackage(data)
  {
    return this.http.post<any>(this.addPackageURL, data)
  }

  updatePackage(data, id)
  {
    return this.http.post<any>(`${this.updatePackageURL}/${id}`, data)
  }
}
