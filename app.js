var express = require('express');
var app = express();
var cors = require('cors');
var ogs = require('open-graph-scraper');

app.options('/:url', cors());
app.get('/:url', cors(), function (req, res) {
  var url = decodeURIComponent(req.params.url);
  if (url) {
    var options = {'url':url, 'timeout':15000};
    ogs(options, function(err, results) {
      if (results.success) {
        res.json(results);
      } else {
        res.sendStatus(404);
      }
    });
  } else {
    res.send('Hello!');
  }
});

app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function () {});
