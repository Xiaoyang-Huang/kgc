function myNavigator(id){
	var content = document.getElementById(id);
	var items = content.getElementsByClassName('cg-item');
	var contents = content.getElementsByClassName('cg-content');
	
	var currentIndex = 0;
	var runId = 0;

	// var hideAllContent = function(){
	// 	for(var i=0,il=contents.length; i<il; i++){
	// 		contents[i].style.display = "none";
	// 	}
	// }

	// var showContent = function(index){
	// 	hideAllContent();
	// 	for(var i=0,il=contents.length; i<il; i++){
	// 		if(i == index){
	// 			contents[i].style.display = "block";
	// 			currentIndex = i + 1;
	// 		}
	// 	}
	// }.bind(this)

	var showContent = function(index){
		for(var i=0,il=contents.length; i<il; i++){
			if(i != index)
				contents[i].style.display = "none";
			else{
				contents[i].style.display = "block";
				currentIndex = i + 1;
			}
		}
	}.bind(this)

	var startLoop = function(){
		runId = setInterval(function(){
			console.log(currentIndex, items.length);
			if(currentIndex >= items.length) currentIndex = 0;
			showContent(currentIndex++);
		}.bind(this), 1000)
	}.bind(this)

	for(var i=0,il=items.length; i<il; i++){
		items[i].addEventListener('mouseenter', (function(i){
			return function(evt){
				clearInterval(runId);
				showContent(i);
				evt.target.className = "cg-item open";
			}
		})(i));

		items[i].addEventListener('mouseleave', (function(i){
			return function(evt){
				showContent(i);
				startLoop();
				evt.target.className = "cg-item";
			}
		})(i));
	}

	showContent(0);
	startLoop();

	// return{
	// 	showContent: showContent,
	// 	startLoop: startLoop
	// }
	return{
		showContent: showContent
	}
}