var React = require('react');
var ReactDOMServer = require('react-dom/server');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

var DB = [];
var idGen = 0;
global.DB = DB;


app.use(require('connect-livereload')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',express.static('www'));

//api start
app.post('/api/add', function(req, res){
  var item = {title:req.body.val, completed: false, id:++idGen}
  DB.push(item);
  res.send(JSON.stringify({state:'success', id:idGen}))
})

app.post('/api/toggle', function(req, res){
  for(var i=0,il=DB.length; i<il; i++){
    var item = DB[i];
    if(item.id == req.body.id){
      item.completed = !item.completed;
      break;
    }
  }
  res.send(JSON.stringify({state:'success'}));
})

app.post('/api/toggleAll', function(req, res){
  for(var i=0,il=DB.length; i<il; i++){
    var item = DB[i];
    item.completed = req.body.state;
  }
  res.send(JSON.stringify({state:'success'}));
})
//api end

var Templete = require('./www/dest/index.js');

app.get('/*', function(req, res){
  var html = '<!DOCTYPE html>';
  html += ReactDOMServer.renderToStaticMarkup(React.createElement(Templete, {URL: req.url, DB: DB}));
  res.send(html);
})

app.listen(port);
console.log('web start at', port);
