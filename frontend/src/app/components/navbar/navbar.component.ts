import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private accountsService: AccountsService) { }
  
  
  ngOnInit(): void {
  }
   
  'isVisible': string = 'visible';
  'modalBoxPosition': string = 'relative';

  toggleLogin() {
    if (this.isVisible == 'visible') {
      this.isVisible = 'hidden';
      this.modalBoxPosition = 'absolute';
    } else {
      this.isVisible = 'visible';
      this.modalBoxPosition = 'relative';
    }
  }

  modalStyle() {
    return {
      'visibility': this.isVisible,
      'color': 'red',
      'width': '30vw',
      'height': '20vw',
      'background-color':'#606060',
      'display': 'flex',
      'border-radius': '30px'

    }
  }

  modalBoxStyle() {
    return {
      'position': this.modalBoxPosition,
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center'
    }
  }

  login(value: any) {
    
    this.toggleLogin();


    const account = {
      'email': value[Object.keys(value)[0]],
      'password': value[Object.keys(value)[1]]
    }

    this.accountsService.getAccounts(account).subscribe((data) => {
      console.log(data);
    }
    );

  }
  
}
