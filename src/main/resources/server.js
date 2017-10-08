'use strict';

var path = require('path'),
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  config = require('./config')[app.get('env')];

var onServerStarted;
var serverStatus = {isRuning: false};
var serverExecute = new Promise(function (resolve, reject) {
  onServerStarted = resolve;
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
  verify: function (req, res, buffer) {
    req.rawBody = buffer;
  }
}));

app.use(express.static(path.join(__dirname, '../webapp')));

app.get('/', function (req, res, next) {
  res.send("PONG");
});

var items = [];
var addNewItem = function (req) {
  var item = {
    id: (items.length + 1),
    property1 : req.body.property1,
    property2 : req.body.property2,
    property3 : req.body.property3,
    status : req.body.status
  };
  items.push(
    item
  );
  return item;
};

app.get('/api/items/', function (req, res, next) {
  res.send(items);
});

app.post('/api/items/', function (req, res) {
  res.send(addNewItem(req));
});

app.put('/api/items/', function (req, res) {
  res.send(addNewItem(req));
});

var server = app.listen(3000, function () {
  console.log('Listening on port %d with env=%s', server.address().port, app.get('env'));
  serverStatus.isRuning = true;
  onServerStarted();
});

module.exports = {
  server: server,
  status: serverStatus,
  execute: serverExecute
};