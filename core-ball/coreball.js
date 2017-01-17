var canvas = document.getElementById('main');
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
  view: canvas
});

var core_radius = 30;
var ball_radius = 10;
var stage = new PIXI.Container();
var core = new PIXI.Graphics();
var fps = 60;
var speed = 5;
var ball_distance = 150;
var existed_balls = []
var index_offset = 0;
var game_over = false;

core.beginFill(0xFFFFFF);
core.drawCircle(0, 0, core_radius);
core.x = window.innerWidth / 2;
core.y = 200;
core.endFill();
core.lineStyle(1,0xFFFFFF)

function create_ball(arc, hasText) {
  var ball = new PIXI.Graphics();
  var x = Math.sin(arc) * ball_distance;
  var y = Math.cos(arc) * ball_distance;
  
  core.moveTo(0, 0);
  core.lineTo(x, y);

  ball.beginFill(0xFFFFFF);
  ball.x = x;
  ball.y = y;
  ball.radius = ball_radius;
  ball.drawCircle(0, 0, ball.radius);
  ball.endFill();
  existed_balls.push(ball);

  if(hasText){
    var text = new PIXI.Text(("0000" + (existed_balls.length + index_offset)).substr(-2, 2), { fontFamily: "Arial", fontSize: 12, fill: 0x000000 });
    text.anchor.x = 0.5;
    text.anchor.y = 0.5;
    text.rotation = -arc;
    ball.addChild(text);
  }else{
    index_offset--;
  }

  core.addChild(ball);

  if(check_collision(ball)){
    ball.tint = 0xFF0000;
    game_over = true;
  }
}

function check_collision(target){
  if(existed_balls.length <= 1) return false;
  var bump = new Bump(PIXI);
  for(var i=0,il=existed_balls.length; i<il; i++){
    var item=existed_balls[i];
    if(item != target && bump.hitTestCircle(target, item)) return true;
  }
  return false;
}

canvas.addEventListener('click', function (e) {
  if(game_over) return;
  create_ball(core.rotation, true)
  renderer.render(stage);
})

stage.addChild(core);

(function renderFrame() {
  renderer.render(stage);

  if(!game_over) {
    core.rotation += Math.PI * 2 / fps / speed;
    setTimeout(function () { renderFrame() }, 1000 / fps)
  }else{
    console.log("game_over");
  }
})()
