var React = require('react');
var ReactDOM = require('react-dom');
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var TodoItem = require('./TodoItem.jsx');
var TodoFooter = require('./TodoFooter.jsx');

var ids = 0;

var TodoList = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("TodoStore")],

  getStateFromFlux: function(flux){
    return {
      db: this.getFlux().store("TodoStore").todos
    }
  },

  onFilter: function(showState){
    this.setState({nowShowing: showState})
  },

	render: function(){
		var todos = this.state.db.filter(function(item){
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
		var activeTodoCount = this.state.db.reduce(function (accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    var completedCount = this.state.db.length - activeTodoCount;

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

module.exports = TodoList
