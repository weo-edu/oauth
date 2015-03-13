var popup = require('oauth-popup');
var oauthUrl = require('oauth-url');

function OAuth() {
  if(! (this instanceof OAuth))
    return new OAuth(provider);
}

OAuth.prototype.use = function(plugin) {
  plugin(this);
  return this;
};

Oauth.prototype.popup = popup;
Oauth.prototype.oauthUrl = oauthUrl;

OAuth.prototype.open = function(opts, cb) {
  if(arguments.length === 1) {
    cb = opts;
    opts = this.provider.popupDefaults || {};
  }

  var provider = this.provider;
  var url = this.oauthUrl(provider.baseUrl, provider);

  this.popup(url, opts, function(err, oauthData) {
    if(oauthData) {
      oauthData.providerName = provider.name;
      oauthData.scope = provider.scope;
    }

    cb(err, oauthData);
  });

  return this;
};

module.exports = OAuth;