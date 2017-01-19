const conf = require('./config/app.conf');
var express = require('express');
var bodyParser = require('body-parser');
const pug = require('pug');
var app = express();
var server = require('http').createServer(app);
var request = require("request")

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

server.listen(conf.port, function (err) {
  if(!err){
    console.log("Running at: "+conf.port);
  }
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Key");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get('/:image', function(req, res, next) {
  //console.log(req.headers.referer);
  console.log("you want "+req.params.image+" but I dont care this is not a penis jpg");
  res.sendFile(__dirname + "/public/assets/img/pixel.gif");
});

app.get('/api/version',function(req,res){
  var response={"version":conf.version};
  res.status(200).jsonp(response);
});

app.get('/', function(req, res, next) {
  var data = conf.pug;
  var html = pug.renderFile('./views/index.pug',data);
  res.send(html);
});
