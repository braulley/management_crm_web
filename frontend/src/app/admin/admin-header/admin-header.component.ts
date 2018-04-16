import { AuthService } from './../../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  auth: any;
  constructor(private authService: AuthService) {
    this.auth = this.authService.getUser().name;
   }

   logout (e) {
    e.preventDefault();
    this.authService.logout();
   }

  ngOnInit() {
  }

}
