'use strict';

var through = require('through2');
var Stream = require('readable-stream');

var bufferContents = function(file, enc, cb){
  console.log("test", file.isStream())
  var path = file.relative;
  var content = file.contents;
  if(!file.isStream()){
    if(path != "index.js"){
      var prepend = new Buffer('registJS.add("' + path.replace("\\","/") + '", function(){\n');
      var append = new Buffer('\n});');
      file.contents = Buffer.concat([prepend, content, append], prepend.length + content.length + append.length);
    }
    cb(null, file);
  }
}

var endStream = function(cb){
  cb();
}

module.exports = through.obj(bufferContents, endStream);
