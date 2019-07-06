import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private searchURL = "http://localhost:3000/api/guest_search"

  constructor(private http: HttpClient) { }

  search(searchData)
  {
    console.log("USAO U SEARCH SERVICE")
    return this.http.post<any>(this.searchURL, searchData)
  }
}
