export class Library {
  heading = 'Contract Library';

  configureRouter(config, router) {
    config.map([
      { route: ['', 'inbox'], name: 'inbox',       moduleId: 'inbox',       nav: true, title: 'Inbox' },
      // { route: 'drafts',         name: 'drafts',         moduleId: 'drafts',         nav: true, title: 'Drafts' },
      // { route: 'templates',         name: 'templates',         moduleId: 'templates',         nav: true, title: 'Templates' },
    ]);

    this.router = router;
  }
}
