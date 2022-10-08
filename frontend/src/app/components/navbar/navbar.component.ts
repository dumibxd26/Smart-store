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
              private cookieService: CookieService) {}
  
  ngOnInit(): void {
      
    const token = this.cookieService.get('token');

    this.accountsService.checkDefaultToken(token).subscribe((data) => {
      if (data.success === true) {
        this.toggleLRVisibility();
        this.toggleLogoutVisibility();
      }
    });
  }

  isVisibleLRuttons : string = 'visible';
  positionLRButtons: string = 'relative';

  isVisibleLogoutButton : string = 'hidden';
  positionLogoutButton: string = 'absolute';

  LRVisibility() {
    return {
      'visibility': this.isVisibleLRuttons,
      'position': this.positionLRButtons
    }
  }

  logoutVisibility() {
    return {
      'visibility': this.isVisibleLogoutButton,
      'position': this.positionLogoutButton
    }
  }

  toggleLRVisibility() {
    if (this.isVisibleLRuttons === 'visible') {
      this.isVisibleLRuttons = 'hidden';
      this.positionLRButtons = 'absolute';
    } else {
      this.isVisibleLRuttons = 'visible';
      this.positionLRButtons = 'relative';
    }
  }

  toggleLogout() {
    const token = this.cookieService.get('token');

    this.accountsService.sendLogout(token).subscribe((data) => {
      
      if(data.success) 
        console.log("Logout successful, solve later");

      this.cookieService.delete('token');
      this.toggleLogoutVisibility();
      this.toggleLRVisibility();
  });
}

  toggleLogoutVisibility() {
    if (this.isVisibleLogoutButton === 'visible') {
      this.isVisibleLogoutButton = 'hidden';
      this.positionLogoutButton = 'absolute';
    } else {
      this.isVisibleLogoutButton = 'visible';
      this.positionLogoutButton = 'relative';
    }
  }

  'isVisibleError': string = 'hidden';
  'errorBoxPosition': string = 'absolute';
  'errorMessage' : string = 'Invalid information';

  toggleError() {
    if (this.isVisibleError === 'visible') {
      this.isVisibleError = 'hidden';
      this.errorBoxPosition = 'absolute';
    } else {
      this.isVisibleError = 'visible';
      this.errorBoxPosition = 'relative';
    }
  }

  'isVisibleLogin': string = 'hidden';
  'modalBoxPositionLogin': string = 'absolute';

  toggleLogin() {
    if (this.isVisibleLogin === 'visible') {
      this.isVisibleLogin = 'hidden';
      this.modalBoxPositionLogin = 'absolute';

      if (this.isVisibleError === 'visible')
        this.toggleError();
    } else {
      if (this.isVisibleRegister === 'visible') 
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

      if(data.success === true) {
          this.toggleLogin();
          this.toggleLRVisibility();
          this.toggleLogoutVisibility();

          // No need to toggle error because it toggles on login/register
          // if (this.isVisibleError === 'visible')
          //   this.toggleError();

          this.cookieService.set('token', data.token);
          console.log(this.cookieService.get('token'));

          // Refresh the page if login is successful
          window.location.reload();
      } else {
        this.errorMessage = data.message;

        if(this.isVisibleError === 'hidden')
          this.toggleError();
      }
    }
    );
  }

  'isVisibleRegister': string = 'hidden';
  'modalBoxPositionLoginRegister': string = 'absolute';

  toggleRegister() {
    if (this.isVisibleRegister === 'visible') {
      this.isVisibleRegister = 'hidden';
      this.modalBoxPositionLoginRegister = 'absolute';

      if (this.isVisibleError === 'visible')
        this.toggleError();
    } else {

      if(this.isVisibleLogin === 'visible') 
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
  
  styleErrorBox() {
    return {
      'visibility': this.isVisibleError,
      'position': this.errorBoxPosition,
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'center'
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
      if (data.success === true) {
        this.toggleRegister();
        this.toggleLRVisibility();
        this.toggleLogoutVisibility();

        // Refresh the page if login is successful
        window.location.reload();
      } else {
        this.errorMessage = data.message;
        
        if(this.isVisibleError === 'hidden')
          this.toggleError();
      }
    }
    );
  }

}
