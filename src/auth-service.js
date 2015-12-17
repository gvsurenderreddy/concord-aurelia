import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
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
        .withBaseUrl(config.baseUrl);
    });

    this.http = http;
    this.session = JSON.parse(Cookie.get(config.tokenName) || null);
  }

  login(username, password) {
    this.http
      .fetch(config.baseUrl + config.loginUrl, {
        headers: {"content-type" : "application/json"},
        method: 'POST',
        body: JSON.stringify({
          username,
          password
        })
      })
      .then((response) => response.content)
      .then((session) => {
        Cookie.set(config.tokenName, JSON.stringify(session));
        this.session = session;
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
