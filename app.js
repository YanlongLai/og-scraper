var express = require('express');
var app = express();
var cors = require('cors');
var request = require('request');
var cheerio = require ('cheerio');

app.use(cors());

app.get('/:url', function(req, res) {
  var url = decodeURIComponent(req.params.url);
  if (url) {
    request(url, function(error, response, body) {
      if (!error) {
        var $ = cheerio.load(body);
        var tags = {};
        $('meta[property*="og:"], meta[property*="twitter:"]').each(function(i, el){
          var $this = $(this);
          var prop = $this.attr('property');
          var con = $this.attr('content');
          tags[prop] = con;
        });
        res.json(tags);
      } else {
        console.log(error);
        res.sendStatus(404);
      }
    });
  } else {
    res.send('Hello!');
  }
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {});
