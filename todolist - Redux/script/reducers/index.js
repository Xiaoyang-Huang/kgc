var constants = require('../constants.js');

var ids = 0;

module.exports = function(state, action){
	console.log("reducer recieved action", state, action);
	if(state == undefined) state = { todo:[] };
	switch(action.type){
		case constants.ADD_TODO:
			state.todo.push({title:action.val, completed: false, id:++ids});
			break;
		case constants.TOGGLE_TODO:
			for(var i=0; i<state.todo.length; i++){
				var item = state.todo[i];
				if(item.id == action.id){
					item.completed = !item.completed;
					break;
				}
			}
			break;
		case constants.TOGGLE_ALL_TODO:
			for(var i=0; i<state.todo.length; i++){
	      state.todo[i].completed = evt.target.checked;
	    }
			break;
		case constants.DESTORY_TODO:
			for(var i=0; i<state.todo.length; i++){
				var item = state.todo[i];
				if(item.id == action.id){
					state.todo.splice(i, 1);
					break;
				}
			}
			break;
		case constants.CLEAR_TODOS:
			for(var i=state.todo.length - 1; i>=0; i--){
	      var item = state.todo[i]
	      if(item.completed){
	        state.todo.splice(i, 1);
	      }
	    }
			break;
	}
	return Object.assign({}, state);
}