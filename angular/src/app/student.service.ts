import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private searchURL = "http://localhost:3000/api/student_search"

  constructor(private http: HttpClient) { }

  search(searchData)
  {
    return this.http.post<any>(this.searchURL, searchData)
  }
}
