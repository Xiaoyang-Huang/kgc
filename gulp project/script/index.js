var registJS = (function() {
  var scripts = {};
  return {
    add: function(key, func) {
      if (key.indexOf('.') > -1) {
        key = key.substr(0, key.lastIndexOf('.'));
      }
      var attr = key.split('/');
      if(attr.length == 1){
        scripts[key] = func;  
      }else{
        var tempScript = scripts;
        for(var i=0,il=attr.length; i<il; i++){
          if(i < il - 1){
            if(tempScript[attr[i]] === undefined){
              tempScript[attr[i]] = {};
            }
          }else{
            tempScript[attr[i]] = func;
          }
          tempScript = tempScript[attr[i]];
        }
      }
    },
    get: function(key) {
      if (key.indexOf('.') > -1) {
        key = key.substr(0, key.lastIndexOf('.'));
      }
      var attr = key.split('/');
      if(attr.length == 1){
        return scripts[key];
      }else{
        var tempScript = scripts;
        for(var i=0,il=attr.length; i<il; i++){
          if(i < il - 1){
            if(tempScript[attr[i]] === undefined){
              return null;
            }
          }else{
            return tempScript[attr[i]];
          }
          tempScript = tempScript[attr[i]];
        }
      }
      return null;
    },
    run: function() {
    }
  };
})();
var module = module || {};
module.exports = registJS;
