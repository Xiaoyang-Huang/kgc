var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactRouter = require('react-router');
var match = ReactRouter.match;

var Redux = require('redux');
var Thunk = require('redux-thunk').default;

var reducer = require('./script/reducer/index.js');

var port = global.port = 3000;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(require('connect-livereload')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('www'));

var Application = require('./www/dest/index.js');

var DB = [];
var idGen = 0;
global.DB = DB;

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

app.get('/*', function (req, res) {
  match({ routes: Application.routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var route = renderProps.routes[renderProps.routes.length - 1];
      var store = Redux.createStore(reducer, {todo: DB}, Redux.applyMiddleware(Thunk));
      if (route.action) {
        var asyncAction = route.action(store, req);
        if (asyncAction) {
          asyncAction.then(function () {
            res.status(200).send(Application.template
              .replace('{app}', ReactDOMServer.renderToString(React.createElement(Application.app, { URL: req.url, store: store, renderProps: renderProps })))
              .replace('{serverStore}', 'window.__INITIAL_STORE__ = ' + JSON.stringify(store.getState()) + ';'));
          }, function (err) { console.error(err); res.status(500).send(err) });
          return;
        }
      }
      res.status(200).send(Application.template
        .replace('{app}', ReactDOMServer.renderToString(React.createElement(Application.app, { URL: req.url, store: store, renderProps: renderProps })))
        .replace('{serverStore}', 'window.__INITIAL_STORE__ = ' + JSON.stringify(store.getState()) + ';'));
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(port);
console.log('web start at', port);
