import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-mylogin',
  templateUrl: './mylogin.component.html',
  styleUrls: ['./mylogin.component.css']
})
export class MyloginComponent implements OnInit {

  myError = '';
  checkoutForm;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.checkoutForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }
  onSubmit(customerData) {
    this.http.post<any>('http://localhost:3000/user/login',
      { email: customerData.email,
        password: customerData.password}, {observe: 'response'}).subscribe(response => {
          if (response.status === 200) {
            this.cookieService.set('jwt', response.body.token);
            this.router.navigate(['/chat']);
          }
      // this.postId = data.id;
          console.log('success', response);
    }
    , error => {this.myError = 'Invalid E-mail or Password';});
    console.log('login', customerData);
  }
}
