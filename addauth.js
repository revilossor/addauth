function addauth(username, password) {
  var value = 'Basic ' + btoa(username + ":" + password);

  (function(send) {
    XMLHttpRequest.prototype.send = function(data) {
      this.setRequestHeader('Authorization', value);
      send.call(this, data);
    };
  })(XMLHttpRequest.prototype.send);

  (function(fetch) {
    var headers = new Headers();
    headers.set('Authorization', value);
    window.fetch = function(data) {
      fetch.call(this, data, { headers: headers });
    };
  })(window.fetch);

};
