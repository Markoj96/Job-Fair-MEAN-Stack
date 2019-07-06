import { CompanyService } from './../company.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-show',
  templateUrl: './company-show.component.html',
  styleUrls: ['./company-show.component.css']
})
export class CompanyShowComponent implements OnInit {

  id: Number
  company = { }
  constructor(private route: ActivatedRoute, private companyService: CompanyService) { }

  ngOnInit() 
  {
    this.route.params.subscribe(params => {
      this.id = params["id"]
      this.companyService.getCompany(this.id)
        .subscribe(
          response => {
            this.company = response
          },
          error => {

          }
        )
    })
  }

}
