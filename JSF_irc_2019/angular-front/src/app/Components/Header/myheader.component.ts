import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-myheader',
  templateUrl: './myheader.component.html',
  styleUrls: ['./myheader.component.css']
})
export class MyheaderComponent implements OnInit {
  logout = false;

  constructor(private router: Router, private cookieService: CookieService) {
      if (this.cookieService.get( 'jwt')) {
      this.logout = true;
    }
  }

  ngOnInit(): void {
  }
  logoutFunction() {
    this.cookieService.delete('jwt');
    this.router.navigate(['/']);
  }

}
