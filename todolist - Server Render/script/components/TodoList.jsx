var React = require('react');
var ReactDOM = require('react-dom');
var ReactRedux = require('react-redux');

var actions = require('../action/todo.js');

var TodoItem = require('./TodoItem.jsx');
var TodoFooter = require('./TodoFooter.jsx');

var ids = 0;

var TodoList = React.createClass({
	getInitialState: function() {
		return {
			db:[]
		}
	},

	onAdd: function(val){
		this.state.db.push({title:val, completed: false, id:++ids})
		this.setState(this.state);
	},

	onToggle: function(id){
		for(var i=0; i<this.state.db.length; i++){
			var item = this.state.db[i];
			if(item.id == id){
				item.completed = !item.completed;
				break;
			}
		}
		this.setState(this.state);
	},

	onDestroy: function(id){
		for(var i=0; i<this.state.db.length; i++){
			var item = this.state.db[i];
			if(item.id == id){
				this.state.db.splice(i, 1);
				break;
			}
		}
		this.setState(this.state);
	},

	toggleAll: function(evt){
		for(var i=0; i<this.state.db.length; i++){
      this.state.db[i].completed = evt.target.checked;
    }
    this.setState(this.state);
	},

	onClear: function(){
    for(var i=this.state.db.length - 1; i>=0; i--){
      var item = this.state.db[i]
      if(item.completed){
        this.state.db.splice(i, 1);
      }
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
							title={item.title}
							completed={item.completed}
							onToggle={this.onToggle.bind(this, item.id)}
							onDestroy={this.onDestroy.bind(this, item.id)} />
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

module.exports = ReactRedux.connect(
  function(state){
    return {
      db: state.todo,
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
