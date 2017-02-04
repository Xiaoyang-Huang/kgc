var React = require('react');
var Redux = require('redux');
var ReactRedux = require('react-redux');

var Main = require('./components/Main.jsx');

var Template = React.createClass({
  render: function(){
  	var reducer = require('./reducer/todo.js');
    var store = Redux.createStore(reducer);

    return (
	<html>
	<head>
	  <title>React Start Kit</title>
	  <link rel="stylesheet" type="text/css" href="dest/index.css" />
	</head>
	<body>
	<div id="main">
		<ReactRedux.Provider store={store}>
			<Main />
		</ReactRedux.Provider>
	</div>
	<script type="text/javascript" src="dest/index.js"></script>
	</body>
	</html>
    )
  }
})

module.exports = Template