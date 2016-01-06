var express = require('express');
var app = express();
var ogs = require('open-graph-scraper');



app.get('/:url', function (req, res) {
  var url = decodeURIComponent(req.params.url);
  if (url) {
    var options = {'url':url};
    ogs(options, function(err, results) {
      res.json(results);
    });
  } else {
    res.send('Hello!');
  }
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});
