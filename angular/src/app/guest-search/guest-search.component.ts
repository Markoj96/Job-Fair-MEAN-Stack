import { GuestService } from './../guest.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-search',
  templateUrl: './guest-search.component.html',
  styleUrls: ['./guest-search.component.css']
})
export class GuestSearchComponent implements OnInit {

  constructor(private guestService: GuestService, private router: Router) { }

  ngOnInit() {
  }

  CompanyName: String = ""
  CompanyCity: String = ""
  CompanyActivities = ["IT"]
  searchResult
  searchCompany()
  {
    let searchData =
    {
      CompanyName: this.CompanyName,
      CompanyCity: this.CompanyCity,
      CompanyActivities: this.CompanyActivities
    }
    
    this.guestService.search(searchData)
      .subscribe(
        response => 
        {
          this.searchResult = response
        },
        error => console.log(error)
      )
  }
}
