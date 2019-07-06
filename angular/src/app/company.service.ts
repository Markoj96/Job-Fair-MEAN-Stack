import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyURL = "http://localhost:3000/api/companies/show"

  constructor(private http: HttpClient) { }

  getCompany(id)
  {
    return this.http.get<any>(`${this.companyURL}/${id}`)
  }
}
