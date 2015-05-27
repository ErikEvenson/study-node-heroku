var express = require('express');
var app = express();
var message = require('./server/message');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send(['<p id="hello">', message, '</p>'].join(''));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
