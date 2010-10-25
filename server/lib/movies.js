var sys = require("sys");
var fs = require("fs");
var movies = require("movies-list");

module.exports = {
  find: function (title, limit) {
    limit = limit || 10;
    var words = title.trim().toLowerCase().split(/\s+/);
    var results = [];
    var i, l, j, k = words.length, use;

    for (i = 0, l = movies.length; i < l; i++) {
      use = true;

      for (j = 0; j < k; j++) {
        if (movies[i].toLowerCase().indexOf(words[j]) < 0) {
          use = false;
        }
      }

      if (use) {
        results.push(movies[i]);
      }

      if (results.length == limit) {
        return results;
      }
    }

    return results;
  },

  count: function () {
    return movies.length;
  }
};
