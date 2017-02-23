function XyGallery(id, option) {
  var container = document.getElementById(id);
  if (!~container.className.indexOf('xy-gallery')) container.className += " xy-gallery";
  var defaultOption = {
    defaultWidth: 130,
    defaultHeight: 40,
    activeWidth: 340,
    activeHeight: 400,
    animateDuration: 300
  }

  option = Object.assign({}, defaultOption, option);

  if (option.width && option.height && option.width * option.height != container.children.length) throw "width and height not match children length!";

  var lastRunTime = new Date(0);
  var runId = 0;
  var activePicture = function (index) {
    clearTimeout(runId)
    var currentTime = new Date();
    if (currentTime - lastRunTime < option.animateDuration) {
      runId = setTimeout(function () {
        activePicture(index)
      }, option.animateDuration);
      return;
    }
    lastRunTime = currentTime;

    container.style.width = (option.width - 1) * option.defaultWidth + option.activeHeight + 'px'
    var cx = index % option.width;
    var cy = Math.floor(index / option.width);
    for (var x = 0, xl = option.width; x < xl; x++) {
      for (var y = 0, yl = option.height; y < yl; y++) {
        var cindex = y * option.width + x;
        var item = container.children[cindex];
        if (x == cx && y == cy) {
          item.className = "active";
          item.style.width = option.activeWidth + "px";
          item.style.height = option.activeHeight + "px";
        } else if (x == cx) {
          item.className = "";
          item.style.width = option.activeWidth + "px";
          item.style.height = option.defaultHeight + "px";
        } else if (y == cy) {
          item.className = "";
          item.style.width = option.defaultWidth + "px";
          item.style.height = option.activeHeight + "px";
        } else {
          item.className = "";
          item.style.width = option.defaultWidth + "px";
          item.style.height = option.defaultHeight + "px";
        }
      }
    }
  }
  activePicture(0);

  var runId = 0;
  Array.prototype.forEach.call(container.children, function (o, i) {
    o.addEventListener('mouseenter', function (evt) {
      activePicture(i);
    })
  })

  return {
    active: activePicture,
    setSize: function(width, height){
      if (width && height && width * height != container.children.length) throw "width and height not match children length!";
      option.width = width;
      option.height = height;
      activePicture(0)
    }
  }
}