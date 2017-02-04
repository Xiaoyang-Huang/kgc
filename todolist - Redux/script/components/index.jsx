var React = require('react');
var ReactRedux = require('react-redux');

var actions = require("../actions/index.js");

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
      this.props.onAddTodo(val);
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
        <TodoList />
      </header>
    </div>
    )
  }
})

Main = ReactRedux.connect(null, function(dispatch){
  return {
    onAddTodo: function(val){
      console.log("dispatch an action");
      dispatch(actions.addTodo(val))
    }
  }
})(Main)

module.exports = Main
