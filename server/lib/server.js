var sys = require("sys");
var http = require("http");
var url = require("url");
var paperboy = require("node-paperboy");
var movies = require("movies");

sys.puts(movies.count() + " movies!");

module.exports = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url);

  if (parsedUrl.pathname == "/search") {
    var q = parsedUrl.query.split("=")[1];

    if (req.headers["x-requested-with"] == "XMLHttpRequest") {
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
  } else {
    var delivery = paperboy.deliver("public", req, res);

    delivery.otherwise(function () {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>Nothing to see here, move along</h1>");
      res.end();
    });
  }
});
