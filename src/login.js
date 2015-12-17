import {inject} from 'aurelia-framework';
import AuthService from 'auth-service';

@inject(AuthService)
export class Login {

  constructor(auth) {
    this.auth = auth;
  }

  login() {
    if (this.username && this.password) {
      this.auth.login(this.username, this.password);
    } else {
      this.error = 'Please enter a username and password.';
    }
  }

  activate() {
    this.username = '';
    this.password = '';
    this.error = '';
  }
}
