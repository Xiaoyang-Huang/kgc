var window = window || global;
window.isServer = !window.document;

var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var ReactRouter = require('react-router');
var Thunk = require('redux-thunk').default;

var containerID = 'main';

var Routes = require('./router.jsx');
module.exports.routes = Routes;

var reducer = require('./reducer/index.js');

if(!isServer){
  var store = Redux.createStore(reducer, window.__INITIAL_STORE__ ? window.__INITIAL_STORE__ : {}, Redux.applyMiddleware(Thunk));
  window.store = store;
  window.route = Routes;
  ReactRouter.match({history: ReactRouter.browserHistory, routes:Routes}, (error, redirectLocation, renderProps) => {
    global.initial = true;
    ReactDOM.render(<ReactRedux.Provider store={store}>
      <ReactRouter.Router {...renderProps} />
    </ReactRedux.Provider>, document.getElementById(containerID))
    global.initial = false;
  })
}else{
  
  var Template = (
  ` <!DOCTYPE html>
    <html>
      <head>
        <title>React Server Render</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <link rel="stylesheet" type="text/css" href="/dest/index.css" />
      </head>
      <body>
      <div id={containerID} className="container-fluid">{app}</div>
      <script type="text/javascript">{serverStore}</script>
      <script type="text/javascript" src="/dest/index.js"></script>
      </body>
    </html>
  `);
  Template = Template.replace('{containerID}', containerID);

  var App = React.createClass({
    render: function(){
      return (
        <ReactRedux.Provider store={this.props.store}>
          <ReactRouter.RouterContext {...this.props.renderProps} />
        </ReactRedux.Provider>
      )
    }
  })

  module.exports.template = Template;
  module.exports.app = App;
}

