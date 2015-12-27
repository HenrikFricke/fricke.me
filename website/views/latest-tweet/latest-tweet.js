var url = "http://frickewebdesign.de/services/latesttweet/";
var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    document.getElementById('tweet').innerHTML = xmlHttp.responseText;
}
xmlHttp.open("GET", url);
xmlHttp.send(null);
