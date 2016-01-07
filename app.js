var express = require('express');
var app = express();
var cors = require('cors');
var request = require('request');
request = request.defaults({ jar: request.jar() });
var cheerio = require ('cheerio');
app.options('/:url', cors());

app.get('/:url', cors(), function (req, res) {
  var url = decodeURIComponent(req.params.url);
  if (url) {
    request(url, function (error, response, body) {
      if (!error) {
        var $ = cheerio.load(body);
        var tags = [];
        $('meta[property*="og:"], meta[property*="twitter:"]').each(function(i, el){
          tags[i] = {
            property: $(this).attr('property'),
            content: $(this).attr('content')
          }
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

var server = app.listen(app.get('port'), function () {});
