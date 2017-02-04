var constants = require('../constants.js');

var actions = {
  addTodo: function(val) {
    this.dispatch(constants.ADD_TODO, val);
  },

  toggleTodo: function(id) {
    this.dispatch(constants.TOGGLE_TODO, id);
  },

  toggleAllTodo: function(state){
    this.dispatch(constants.TOGGLE_ALL_TODO, state)
  },

  clearTodos: function() {
    this.dispatch(constants.CLEAR_TODOS);
  },

  destroyTodo: function(id){
    this.dispatch(constants.DESTORY_TODO, id);
  }
};

module.exports = actions;
