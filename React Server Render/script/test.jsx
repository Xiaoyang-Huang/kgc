var React = require('react');
var ReactRouter = require('react-router');

var Main = React.createClass({

  render: function(){
    return (
    <div className="todoapp">
      test component
      <ReactRouter.Link to="/" >back</ReactRouter.Link>
    </div>
    )
  }
})

module.exports = Main;
