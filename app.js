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

app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function () {});
