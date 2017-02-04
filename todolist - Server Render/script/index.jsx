var React = require('react');
var Redux = require('redux');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');
var ReactRouter = require('react-router');

var app = global.app || {};
app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';
global.app = app;

var reducer = require('./reducer/todo.js');
var store = Redux.createStore(reducer);

var Main = require('./components/Main.jsx');
var Test = require('./components/Test.jsx');

ReactDOM.render(
  (<ReactRedux.Provider store={store}>
    <ReactRouter.Router history={ReactRouter.hashHistory}>
      <ReactRouter.Route path="/">
        <ReactRouter.IndexRoute component={Main} />
        <ReactRouter.Route path="test" component={Test} />
      </ReactRouter.Route>
    </ReactRouter.Router>
  </ReactRedux.Provider>), document.getElementById('main'));