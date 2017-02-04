var React = require('react');
var ReactRedux = require('react-redux');

var actions = require("../actions/index.js");

var TodoItem = React.createClass({
	render: function(){
		return (
		<li className={this.props.completed ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={this.props.completed}
          onChange={this.props.onToggle}
        />
        <label>
          {this.props.title}
        </label>
        <button className="destroy" onClick={this.props.onDestroy} />
      </div>
    </li>
		)
	}
})

TodoItem = ReactRedux.connect(
  null,
  function(dispatch, props){
    return {
      onToggle: function(){
        dispatch(actions.toggleTodo(props.id));
      },
      onDestroy: function(){
        dispatch(actions.destroyTodo(props.id));
      }
    }
  }
)(TodoItem)

module.exports = TodoItem