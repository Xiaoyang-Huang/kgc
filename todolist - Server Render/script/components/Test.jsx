var React = require('react');
var ReactRedux = require('react-redux');
var Link = require('react-router').Link;

var Test = React.createClass({
  render: function(){
    console.log(this.props);
    return (
    <div className="todoapp">
      <span>this is test page</span>
      <Link to={{pathname:"/", query:{abc:1}}}>back to home page</Link>
    </div>
    )
  }
})

module.exports = Test