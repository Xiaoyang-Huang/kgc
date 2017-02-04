var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var ReactRouter = require('react-router');
var Thunk = require('redux-thunk').default;

var window = window || global;

var Main = require('./index.jsx');

var Routes = require('./router.jsx');

if(window.document){

  var reducer = require('./reducer/todo.js');
  var store = Redux.createStore(reducer, window.__INITIAL_STORE__ ? window.__INITIAL_STORE__ : {}, Redux.applyMiddleware(Thunk));
  
  ReactDOM.render(
  <ReactRedux.Provider store={store}>
    <ReactRouter.Router routes={Routes} history={ReactRouter.hashHistory} />
  </ReactRedux.Provider>, document.getElementById('main'));

}else{

  var Templete = React.createClass({
    render: function(){
      var reducer = require('./reducer/todo.js');
      var store = Redux.createStore(reducer, { todo: this.props.DB }, Redux.applyMiddleware(Thunk));

      var context = {}
      ReactRouter.match({ routes:Routes, location: this.props.URL }, (error, redirectLocation, renderProps) => {
        context.error = error;
        context.redirectLocation = redirectLocation;
        context.renderProps = renderProps;
      })

      var content = null;
      if(context.error){
        content = <span>error!</span>
      }else{
        content = React.createElement(ReactRouter.RouterContext, context.renderProps);
      }
      
      return (
      <html>
      <head>
        <title>React Start Kit</title>
        <link rel="stylesheet" type="text/css" href="dest/index.css" />
      </head>
      <body>
      <div id="main">
        <ReactRedux.Provider store={store}>
          {content}
        </ReactRedux.Provider>
      </div>
      <script type="text/javascript" dangerouslySetInnerHTML={{__html:'window.__INITIAL_STORE__ = ' + JSON.stringify(store.getState()) + ';'}}></script>
      <script type="text/javascript" src="dest/index.js"></script>
      </body>
      </html>
      )
    }
  })

  module.exports = Templete;
}


