var React = require('react');
var ReactRouter = require('react-router');

var Main = require('./index.jsx');
var Test = require('./test.jsx');

module.exports = {
  path: '/',
  indexRoute: { component: Main },
  childRoutes: [
    { path: 'test', component: Test }
  ]
}
