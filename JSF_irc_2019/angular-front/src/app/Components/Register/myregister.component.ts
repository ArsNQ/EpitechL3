import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-myregister',
  templateUrl: './myregister.component.html',
  styleUrls: ['./myregister.component.css']
})
export class MyregisterComponent implements OnInit {

  checkoutForm;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.checkoutForm = new FormGroup({
      username: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }
  onSubmit(customerData) {
    this.http.post<any>('http://localhost:3000/user/signup',
      { email: customerData.email,
              username: customerData.username,
              password: customerData.password,
              isAdmin: 0 }, {observe: 'response'}).subscribe(response => {
                if (response.status === 200) {
                  this.router.navigate(['/']);
                }
                console.log('success', response.status);
    });
    console.log('register', customerData);
  }
}
