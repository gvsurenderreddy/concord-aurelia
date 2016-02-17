import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Cookie} from './cookie';
import config from 'config';

@inject(HttpClient)
export default class AuthService {

  session = null;

  // As soon as the AuthService is created, we query Cookie to
  // see if the login information has been stored. If so, we immediately
  // load it into the session object on the AuthService.
  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withDefaults({
          credentials: 'same-origin',
          headers: {"content-type" : "application/json"}
        })
        .withBaseUrl(config.baseUrl);
    });

    this.http = http;
    this.session = Cookie.get(config.tokenName) || null;
  }

  login(username, password) {
    this.http
      .fetch(config.baseUrl + config.loginUrl, {
        method: 'post',
        body: json({
          username,
          password
        })
      })
      .then((response) => {
        Cookie.set(config.tokenName, true);
      });
  }

  logout() {
    Cookie.set(config.tokenName, null);
    this.session = null;
  }

  isAuthenticated() {
    return this.session !== null;
  }

  can(permission) {
    return true; // why not?
  }
}
