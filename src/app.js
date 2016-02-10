import {inject} from 'aurelia-framework';
import {Redirect} from 'aurelia-router';
import {I18N} from 'aurelia-i18n';
import AuthService from 'auth-service';

@inject(I18N)
export class App {
  constructor(i18n) {
    this.i18n = i18n;
  }

  configureRouter(config, router) {
    config.title = 'Concord';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: ['', 'library'],  name: 'library', moduleId: 'library', nav: true, auth: true, title: this.i18n.tr('Contract library') },
      { route: 'options',  name: 'options', moduleId: 'options', nav: true, auth: true, title: this.i18n.tr('Options') },
      { route: 'login',  name: 'login', moduleId: 'login', nav: true, title: this.i18n.tr('Login') },
    ]);

    this.router = router;
  }
}

@inject(AuthService)
class AuthorizeStep {
  constructor(auth) {
    this.auth = auth;
  }

  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
      var isLoggedIn = this.auth.isAuthenticated();
      if (!isLoggedIn) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
