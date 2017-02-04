var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var port = 3000;

var DB = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", express.static("static"));


app.post("/api/add_comment", function(req, res, next){
  var item = {
    username: req.body.username,
    comment: req.body.comment,
    date: new Date()
  };
  console.log(item);
  DB.push(item);
  res.send(JSON.stringify(DB));
})


// app.get("/api/json", function(req, res, next){
//   res.send(JSON.stringify({
//     id:1,
//     content:"this is a json content"
//   }))
// });

// app.get("/api/script", function(req, res, next){
//   res.send("alert('get a script')");
// });

app.get("/api/html", function(req, res, next){
var html = function(){/*
  <a href="http://www.kgc.cn/"><img src="/img/logo.jpg" alt="课工场" /></a><a href="http://www.kgc.cn/list" target="_blank"><img src="/img/slogan.jpg"></a>
  <div class="list-con">
    <h3 class="list-title">最近直播计划</h3>
    <p class="list-img"><a href="https://ke.qq.com/course/85718#term_id=100084006" target="_blank" rel="nofollow"><img alt="510.jpg" src="/img/img.jpg" height="107" width="190"></a></p>
    <div class="list1-cont">
      <div class="view1-tip">
        <a href="https://ke.qq.com/course/95207#term_id=100118842" target="_blank" rel="nofollow">Java面向对象(五)
          <p>[直播时间：7月22日 14:00-15:30 ]</p>
        </a>
      </div>
      <div class="view1-tip">
        <a href="https://ke.qq.com/course/146895#term_id=100166828" target="_blank" rel="nofollow">游戏材质这么画
          <p>[直播时间：7月22日 14:00-15:00 ]</p>
        </a>
      </div>
      <div class="view1-tip" style="overflow:visible;box-sizing:border-box;margin:15px auto 10px;text-align:center;">
        <a class="view1-more" href="http://www.kgc.cn/bbs/post/25705" target="_blank" rel="nofollow">
        <span class="play_btn"></span>更多直播内容</a>
      </div>
    </div>
  </div>
*/}
  res.send(html.toString().replace("function (){/*","").replace("*/}", ""));
});
// app.all("/api/*", function(req, res, next){
//   res.send("abc")
//   next();
// })

app.listen(port);
console.log('web start at port:' + port);
