"no use strict";
(function(window) {
  window.onmessage = function(e) {
    var msg = e.data;
    try {
      var json = JSON.parse(msg);
      postMessage({ status: "success", json: json });
    } catch (e) {
      postMessage({ status: "error", error: e });
    }
  };
})(this);
