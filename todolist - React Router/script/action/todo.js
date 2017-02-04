var constants = require('../constants.js');

module.exports.addTodo = function(val) {
  return {
    type: constants.ADD_TODO,
    val: val
  }
}

module.exports.toggleTodo = function(id) {
  return {
    type: constants.TOGGLE_TODO,
    id: id
  }
}

module.exports.toggleAllTodo = function(state){
  return {
    type: constants.TOGGLE_ALL_TODO,
    state: state
  }
}

module.exports.clearTodos = function() {
  return {
    type: constants.CLEAR_TODOS
  }
}

module.exports.destroyTodo = function(id){
  return {
    type: constants.DESTORY_TODO,
    id: id
  }
}
