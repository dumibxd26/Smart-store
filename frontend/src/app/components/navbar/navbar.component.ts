import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';     

import { AccountsService } from '../services/accounts.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private accountsService: AccountsService, private http: HttpClient,
              private cookieService: CookieService) { 
                  this.cookieService.set('test', 'Hello World!');

              }
  
  
  ngOnInit(): void {
  }
  
  

  'isVisibleLogin': string = 'hidden';
  'modalBoxPositionLogin': string = 'absolute';

  toggleLogin() {
    if (this.isVisibleLogin == 'visible') {
      this.isVisibleLogin = 'hidden';
      this.modalBoxPositionLogin = 'absolute';
    } else {

      if(this.isVisibleRegister == 'visible') 
        this.toggleRegister();

      this.isVisibleLogin = 'visible';
      this.modalBoxPositionLogin = 'relative';
    }
  }

  modalStyleLogin() {
    return {
      'visibility': this.isVisibleLogin,
      'color': 'yellow',
      'width': '35vw',
      'height': '25vw',
      'background-color':'#606060',
      'display': 'flex',
      'border-radius': '30px'
    }
  }

  modalBoxStyleLogin() {
    return {
      'position': this.modalBoxPositionLogin,
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center'
    }
  }

  login(value: any) {

    const account = {
      'email': value[Object.keys(value)[0]],
      'password': value[Object.keys(value)[1]]
    }

    this.accountsService.sendLogin(account).subscribe((data) => {
      if(data.success == true) 
        {
          this.toggleLogin();
          this.cookieService.set('token', data.token);
          console.log(this.cookieService.get('token'));
        }
    }
    );
  }

  'isVisibleRegister': string = 'hidden';
  'modalBoxPositionLoginRegister': string = 'absolute';

  toggleRegister() {
    if (this.isVisibleRegister == 'visible') {
      this.isVisibleRegister = 'hidden';
      this.modalBoxPositionLoginRegister = 'absolute';
    } else {

      if(this.isVisibleLogin == 'visible') 
        this.toggleLogin();

      this.isVisibleRegister = 'visible';
      this.modalBoxPositionLoginRegister = 'relative';
    }
  }

  modalStyleRegister() {
    return {
      'visibility': this.isVisibleRegister,
      'color': 'yellow',
      'width': '40vw',
      'height': '25vw',
      'background-color':'#606060',
      'display': 'flex',
      'border-radius': '30px'
    }
  }

  modalBoxStyleRegister() {
    return {
      'position': this.modalBoxPositionLoginRegister,
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center'
    }
  }

  register(value: any) {

    const account = {
      'firstName': value[Object.keys(value)[0]],
      'lastName': value[Object.keys(value)[1]],
      'email': value[Object.keys(value)[2]],
      'password': value[Object.keys(value)[3]],
      'birthDate': value[Object.keys(value)[4]]
    }

    this.accountsService.sendRegister(account).subscribe((data) => {
      if (data.success == true) {
        this.toggleRegister();
      }
    }
    );
  }
  
}
