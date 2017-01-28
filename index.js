/*
 * History Script
 */

function supportsHistoryApi() {
  return !!(window.history && history.pushState);
}

function swap(href) {
  var req = new XMLHttpRequest();
  // contruct URL to hidden partial page
  var url = "/gallery/" + href.split("/").pop()
  req.open("GET", url, false);
  req.send(null);
  if (req.status == 200) {
    // insert the new content into the current page
    document.getElementById("gallery").innerHTML = req.responseText;
    // have to re-add the event handlers to the new content
    setup();
    return true;
  }
  return false;
}

function addHandler(link) {
  link.addEventListener("click", function(e) {
    // the URL to appear in the location bar
    var url = link.href;
    if (swap(link.href)) {
      // the swap is successfull, so manually update the URL without refreshing the page
      // note: the first argument is 'state', which will be passed to the 'popstate' event handler
      history.pushState(null, null, url);
      e.preventDefault();
    }
  }, true);
}

function setup() {
  // setup the navigation handers
  addHandler(document.getElementById("previous"));
  addHandler(document.getElementById("next"));
}

window.onload = function() {
  if (!supportsHistoryApi()) return;
  setup();
  window.setTimeout(function(){
    // triggered when the user presses the 'back' button
    window.addEventListener("popstate", function(e){
      // manually go back to the previous state (location is already updated to previous page)
      swap(location.pathname);
    }, false);
  }, 1);
}
