function supportsHistoryApi() {
  return !!(window.history && history.pushState);
}

function swap(href) {
  var req = new XMLHttpRequest();
  req.open("GET", "/gallery/" + href.split("/").pop(), false);
  req.send(null);
  if (req.status == 200) {
    document.getElementById("gallery").innerHTML = req.responseText;
    setup();
    return true;
  }
  return false;
}

function addHandler(link) {
  link.addEventListener("click", function(e) {
    if (swap(link.href)) {
      history.pushState(null, null, link.href);
      e.preventDefault();
    }
  }, true);
}

function setup() {
  addHandler(document.getElementById("previous"));
  addHandler(document.getElementById("next"));
}

window.onload = function() {
  if (!supportsHistoryApi()) return;
  setup();
  window.setTimeout(function(){
    window.addEventListener("popstate", function(e){
      swap(location.pathname);
    }, false);
  }, 1);
}
