import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  f: FormGroup;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.f = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
    console.log('Teste');
  }

  onSubmit() {
    this.authService.login(this.f.value).subscribe(
      (response) => {console.log(response); }
    );
  }

}
