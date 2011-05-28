var express = require("express");
var movies = require("movies");

console.log(movies.count() + " movies!");

module.exports = app = express.createServer();

app.configure(function(){
  app.use(express.static(__dirname + '/../public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get("/search", function(req, res) {
  var q = req.param('q');

  if(req.xhr) {
    var result = JSON.stringify(movies.find(q));
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Length": result.length
    });
  } else {
    var result = "<ol>";

    for (var i = 0, l = items.length; i < l; i++) {
      result += "<li>" + items[i] + "</li>";
    }

    result += "</ol>";

    res.writeHead(200, {
      "Content-Type": "text/html",
      "Content-Length": result.length
    });
  }
  res.write(result);
  res.end();
});
