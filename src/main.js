export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-i18n', (instance) => {
      instance.setup({
        resGetPath: 'locale/__lng__/__ns__.json',
        lng: 'fr',
        attributes: ['t','i18n'],
        getAsync: true,
        sendMissing: false,
        fallbackLng: 'en',
        debug: false
      });
    });

  //Uncomment the line below to enable animation.
  //aurelia.use.plugin('aurelia-animator-css');

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(a => a.setRoot());
}
