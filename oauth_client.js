Oauth = {};

// Open a popup window pointing to a OAuth handshake page
//
// @param credentialToken {String} The OAuth credentialToken generated by the client
// @param url {String} url to page
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
// @param dimensions {optional Object(width, height)} The dimensions of
//   the popup. If not passed defaults to something sane
Oauth.initiateLogin = function(credentialToken, url, credentialRequestCompleteCallback, dimensions) {

  var popup = openCenteredPopup(url);

  // wait for webvew to complete auth and try login
  popup.addEventListener('loadstop', function(event) {
    if (event.url.match("webviewclose")) {
      credentialRequestCompleteCallback(credentialToken);
      popup.close();
    }
  });

  // if webview fails changing location to 'webviewclose' try login anyway
  popup.addEventListener('exit', function() { credentialRequestCompleteCallback(credentialToken); });

};


var openCenteredPopup = function(url) {

  //var fixedUrl = url.slice(1); // Fixes android issue where it adds aditional / to url, does not affect ios
 var fixedUrl = '';
url.match(/twitter/) ?fixedUrl = url.slice(1) : fixedUrl = url;
  var newwindow = window.open(fixedUrl, '_blank', 'location=yes', closebuttoncaption="Return");
  if (newwindow.focus)
    newwindow.focus();
  return newwindow;
};
