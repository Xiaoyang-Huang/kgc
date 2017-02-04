var constants = require('../constants.js');
var Fluxxor = require("fluxxor");

var ids = 0;

var TodoStore = Fluxxor.createStore({
  initialize: function(){
    this.todos = [];
    this.bindActions(
      constants.ADD_TODO, this.onAddTodo,  
      constants.TOGGLE_TODO, this.onToggleTodo,
      constants.TOGGLE_ALL_TODO, this.onToggleAllTodo,
      constants.DESTORY_TODO, this.onDestroyTodo,
      constants.CLEAR_TODOS, this.onClearTodos
    )
  },

  onAddTodo: function(val){
    this.todos.push({title:val, completed: false, id:++ids});
    this.emit("change");
  },

  onToggleTodo: function(id){
    for(var i=0; i<this.todos.length; i++){
      var item = this.todos[i];
      if(item.id == id){
        item.completed = !item.completed;
        break;
      }
    }
    this.emit("change");
  },

  onToggleAllTodo: function(state){
    for(var i=0; i<this.todos.length; i++){
      this.todos[i].completed = state;
    }
    this.emit("change");
  },

  onDestroyTodo: function(id){
    for(var i=0; i<this.todos.length; i++){
      var item = this.todos[i];
      if(item.id == id){
        this.todos.splice(i, 1);
        break;
      }
    }
    this.emit("change");
  },

  onClearTodos: function(){
    for(var i=this.todos.length - 1; i>=0; i--){
      var item = this.todos[i]
      if(item.completed){
        this.todos.splice(i, 1);
      }
    }
    this.emit("change");
  },
})

module.exports = TodoStore;
