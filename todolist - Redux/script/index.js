var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');

var reducer = require('./reducers/index.js');

var store = Redux.createStore(reducer);

var app = global.app || {};
app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';
global.app = app;

var Main = require("./components/index.jsx");

var Provier = React.createElement(ReactRedux.Provider, {"store":store}, React.createElement(Main))

ReactDOM.render(Provier, document.getElementById('main'));