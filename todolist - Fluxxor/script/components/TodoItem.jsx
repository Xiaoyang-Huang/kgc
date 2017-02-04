var React = require('react');
var ReactDOM = require('react-dom');
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);

var TodoItem = React.createClass({
  mixins: [FluxMixin],
  onToggle: function(){
    this.getFlux().actions.toggleTodo(this.props.id)
  },
  onDestroy: function(){
    this.getFlux().actions.destroyTodo(this.props.id)
  },
	render: function(){
		return (
		<li className={this.props.completed ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={this.props.completed}
          onChange={this.onToggle}
        />
        <label>
          {this.props.title}
        </label>
        <button className="destroy" onClick={this.onDestroy} />
      </div>
    </li>
		)
	}
})

module.exports = TodoItem
