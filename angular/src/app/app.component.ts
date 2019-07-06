import { CurriculumVitaeService } from './curriculum-vitae.service';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Job Fair Application';
  
  constructor(private authService: AuthService) { }

}
