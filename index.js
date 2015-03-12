var ware = require('ware');
var popup = require('oauth-popup');
var qs = require('qs');

module.exports = function(opts, cb) {
  opts = opts || {};
  if(! getToken)
    throw new Error('must provide getToken function');

  var mw = ware();
  mw.use(popup(opts.popup || {}));
  mw.use(opts.getToken);
  mw.use(opts.storeToken || storeToken());
  mw.run(buildUrl(opts.provider), cb);
}

function buildUrl(provider) {
  var url = provider.url;
  return url + '?' + qs.stringify({
    clientId: provider.clientId,
    scopes: provider.scopes,
    redirectUri: provider.redirectUri
  });
}

function storeToken(name) {
  return function(token, next) {
    window.localStorage[name || 'oauth_token'] = token;
    next();
  };
};