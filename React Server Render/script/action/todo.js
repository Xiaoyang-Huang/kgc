var constants = require('../constants.js');
var axios = require('axios')

module.exports.addTodo = function(val) {
  return function(dispatch){
    axios({
      method: 'post',
      url: '/api/add',
      data: {
        val: val
      }
    }).then(function(res){
      if(res.status == 200){
        dispatch({
          type: constants.ADD_TODO,
          val: val,
          id: res.data.id
        })
      }
    })
  }
}

module.exports.toggleTodo = function(id) {
  return function(dispatch){
    axios({
      method: 'post',
      url: '/api/toggle',
      data: {
        id: id
      }
    }).then(function(res){
      dispatch({
        type: constants.TOGGLE_TODO,
        id: id
      })
    })
  }
}

module.exports.toggleAllTodo = function(state){
  return function(dispatch){
    axios({
      method: 'post',
      url: '/api/toggleAll',
      data: {
        state: state
      }
    }).then(function(res){
      dispatch({
        type: constants.TOGGLE_ALL_TODO,
        state: state
      })
    })
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
