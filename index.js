var popup = require('oauth-popup');
var oauthUrl = require('oauth-url');

function OAuth(provider) {
  if(! (this instanceof OAuth))
    return new OAuth(provider);

  this.provider = provider;
  this.url = oauthUrl(provider.baseUrl, provider);
}

OAuth.prototype.open = function(opts, cb) {
  if(arguments.length === 1) {
    cb = opts;
    opts = this.provider.popupDefaults || {};
  }

  var self = this;
  popup(this.url, opts, function(err, oauthData) {
    if(oauthData)
      oauthData.providerName = self.provider.name;
    cb(err, oauthData);
  });

  return this;
};

OAuth.prototype.storeToken = function(token) {
  window.localStorage.oauth_token = token;
  return this;
};

module.exports = OAuth;