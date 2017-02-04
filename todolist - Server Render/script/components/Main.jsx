var React = require('react');
var ReactRedux = require('react-redux');
var Link = require('react-router').Link;

var TodoList = require('../components/TodoList.jsx')

var actions = require('../action/todo.js');

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
        <TodoList ref="todoApp" />
      </header>
      <Link to={{pathname:"/test", query:{name:'xy'}}}>go to test page</Link>
    </div>
    )
  }
})

// console.log(ReactRedux.Provider);
Main = ReactRedux.connect(null, function(dispatch){
  return {
    onAddTodo: function(val){
      dispatch(actions.addTodo(val));
    }
  }
})(Main)

module.exports = Main