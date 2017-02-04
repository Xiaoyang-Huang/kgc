var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');

var actions = require('../action/todo.js');

var TodoItem = require('./TodoItem.jsx');
var TodoFooter = require('./TodoFooter.jsx');

var ids = 0;

var TodoList = React.createClass({

	render: function(){
		var todos = this.props.db;
		todos = todos.map(function(item){
			return <TodoItem
							key={item.id}
							title={item.title}
							completed={item.completed}
							onToggle={this.props.toggleTodo.bind(this, item.id)}
							onDestroy={this.props.destroyTodo.bind(this, item.id)} />
		}.bind(this));

		var footer = null;
		var activeTodoCount = this.props.db.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    var completedCount = this.props.db.length - activeTodoCount;

    if(activeTodoCount || completedCount){
    	footer = <TodoFooter 
        count={activeTodoCount}
        completedCount={completedCount}
        nowShowing={app.ACTIVE_TODOS}
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

module.exports = ReactRedux.connect(
  function(state){
    return {
      db: state.todo.slice(),
      count: state.todo.length
    }
  },
  function(dispatch){
    return {
      addTodo: function(val){
        dispatch(actions.addTodo(val))
      },
      toggleTodo: function(id){
        dispatch(actions.toggleTodo(id));
      },
      toggleAllTodo: function(state){
        dispatch(actions.toggleAllTodo(state));
      },
      clearTodos: function(){
        dispatch(actions.clearTodos())
      },
      destroyTodo: function(id){
        dispatch(actions.destroyTodo(id));
      }
    }
  }
)(TodoList)
