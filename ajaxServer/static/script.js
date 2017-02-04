$("#submitBtn").click(function(evt){
	evt.preventDefault();
	$.ajax("/api/add_comment",{
		type:"POST",
		data:{
			username: $("#username").val(),
			comment: $("#comment").val()
		},
		success: function(result){
			var comments = JSON.parse(result);
			console.log(comments);
			console.log("提交成功");
		}
	})
	return false;
})

$.ajaxSetup({
	beforeSend: function(){
		console.log("有ajax正在发起", arguments);
	}
})

function ajaxTest(){
	$.ajax({
		url:"/api/html",
		type:"GET",
		success: function(data, state, xhr){
			console.log("请求成功", arguments);
		},
		error: function(xhr, state, data){
			console.log("请求失败", arguments);
		},
		complete: function(xhr, state){
			console.log("请求完成", arguments);
		}
	})
}