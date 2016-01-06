var express = require('express');
var app = express();
var cors = require('cors');
var ogs = require('open-graph-scraper');

app.get('/:url', function (req, res) {
  var url = decodeURIComponent(req.params.url);
  if (url) {
    var options = {'url':url};
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

app.use(cors());

app.set('port', (process.env.PORT || 3000));

var server = app.listen(app.get('port'), function () {});
