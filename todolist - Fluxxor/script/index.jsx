var React = require('react');
var ReactDOM = require('react-dom');
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var todoStore = require('./store/todo.js');

var app = global.app || {};
app.ALL_TODOS = 'all';
app.ACTIVE_TODOS = 'active';
app.COMPLETED_TODOS = 'completed';
global.app = app;

var stores = {
  TodoStore: new todoStore()
}
var actions = require("./action/todoAction.js");

var flux = new Fluxxor.Flux(stores, actions)

var TodoList = require('./components/TodoList.jsx')

var Main = React.createClass({
  mixins: [FluxMixin],

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
      this.getFlux().actions.addTodo(val);
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

ReactDOM.render(<Main flux={flux} />, document.getElementById('main'));
