var React = require('react');
var ReactRedux = require('react-redux');

var actions = require("../actions/index.js");

var TodoItem = require('./TodoItem.jsx');
var TodoFooter = require('./TodoFooter.jsx');

var ids = 0;

var TodoList = React.createClass({
	getInitialState: function() {
		return {
			db:[]
		}
	},

	toggleAll: function(evt){
		for(var i=0; i<this.state.db.length; i++){
	      this.state.db[i].completed = evt.target.checked;
	    }
	    this.setState(this.state);
	},

	onFilter: function(showState){
		this.setState({nowShowing: showState})
	},

	render: function(){
	var todos = this.props.db.filter(function(item){
	switch (this.state.nowShowing) {
		case app.ACTIVE_TODOS:
			return !item.completed;
		case app.COMPLETED_TODOS:
			return item.completed;
		default:
			return true;
	}
    }.bind(this));
		todos = todos.map(function(item){
			return <TodoItem
							key={item.id}
							id={item.id}
							title={item.title}
							completed={item.completed} />
		}.bind(this));

		var footer = null;
		

    if(this.props.activeTodoCount || this.props.completedCount){
    	footer = <TodoFooter 
        count={this.props.activeTodoCount}
        completedCount={this.props.completedCount}
        nowShowing={this.state.nowShowing}
        onClear={this.onClear}
        onFilter={this.onFilter} />
    }

		return (
		<section className="main">
			<input
				className="toggle-all"
				type="checkbox"
				onChange={this.toggleAll} />
			<ul className="todo-list">
				{todos}
			</ul>
			{footer}
		</section>
		)
	}
})

TodoList = ReactRedux.connect(
	function(state){
		console.log("components state change", state);

		var activeTodoCount = state.todo.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    var completedCount = state.todo.length - activeTodoCount;

		return {
			db: state.todo,
			count: state.todo.length,
			activeTodoCount: activeTodoCount,
			completedCount: completedCount
		}
	}
)(TodoList)


module.exports = TodoList