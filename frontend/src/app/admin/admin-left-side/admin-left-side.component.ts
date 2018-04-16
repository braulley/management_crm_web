import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-left-side',
  templateUrl: './admin-left-side.component.html',
  styleUrls: ['./admin-left-side.component.css']
})
export class AdminLeftSideComponent implements OnInit {

  auth: any;

  constructor(private authService: AuthService) {
    this.auth = authService.getUser().name;
    console.log('Auth', this.auth);
   }

  ngOnInit() {
  }

}
