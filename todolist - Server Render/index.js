var express = require('express');
var app = express();
var port = 3000;

var React = require('react');
var ReactDOMServer = require('react-dom/server');

var Template = require('./www/dest/index.js');

app.use('/', express.static('www'));

app.get('/*', function(req, res){
	var html = "<!DOCTYPE html>";
			html += ReactDOMServer.renderToStaticMarkup(React.createElement(Template, {URL: req.url}))
	res.send(html);
})

app.listen(port);
console.log('app start at', port);