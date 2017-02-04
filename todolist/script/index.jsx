var React = require('react');
var ReactDOM = require('react-dom');

var app = global.app || {};
app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';
global.app = app;

var TodoList = require('./TodoList.jsx')

var Main = React.createClass({
  getInitialState: function() {
    return {
      newTodo:''
    }
  },

  handleNewTodoKeyDown: function(evt){
    if(evt.keyCode !== 13){
      return;
    }

    evt.preventDefault();

    var val = this.state.newTodo.trim();
    if(val){
      this.refs.todoApp.onAdd(val);
      this.setState({newTodo:''})
    }
  },

  handleChange: function(evt){
    this.setState({newTodo:evt.target.value});
  },

  render: function(){
    return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input 
          className="new-todo"
          placeholder="What needs to be down?"
          autoFocus={true}
          onKeyDown={this.handleNewTodoKeyDown}
          onChange={this.handleChange}
          value={this.state.newTodo} />
        <TodoList ref="todoApp" />
      </header>
    </div>
    )
  }
})

ReactDOM.render(<Main />, document.getElementById('main'));
