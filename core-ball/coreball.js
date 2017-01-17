var canvas = document.getElementById('main');
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
  view: canvas
});

var core_radius = 30;
var ball_radius = 10;
var stage = new PIXI.Container();
var core = new PIXI.Container();
var waiting = new PIXI.Container();
var fps = 60;
var ball_distance = 150;
var existed_balls = []
var index_offset = 0;
var game_over = false;

var level_data = [
  { "initCount": 3, "waitCount": 5, "speed": 10 },
  { "initCount": 4, "waitCount": 8, "speed": 9 },
  { "initCount": 5, "waitCount": 5, "speed": 8 },
  { "initCount": 3, "waitCount": 5, "speed": 7 },
  { "initCount": 4, "waitCount": 8, "speed": 6 },
  { "initCount": 5, "waitCount": 5, "speed": 5 },
  { "initCount": 6, "waitCount": 7, "speed": 4 }
];
var speed = 10;
var waiting_count = 10;

stage.addChild(core);
stage.addChild(waiting);

core.x = window.innerWidth / 2;
core.y = 200;

waiting.x = window.innerWidth / 2;
waiting.y = core.y + ball_distance + 30;

var center_ball = new PIXI.Graphics();
center_ball.beginFill(0xFFFFFF);
center_ball.drawCircle(0, 0, core_radius);
center_ball.endFill();
center_ball.lineStyle(1, 0xFFFFFF)
core.addChild(center_ball);

function create_text(txt, size) {
  var text = new PIXI.Text(txt, { fontFamily: "Arial", fontSize: size || 12, fill: 0x000000 });
  text.anchor.x = 0.5;
  text.anchor.y = 0.5;
  return text;
}

function create_ball(arc, show_index) {
  var ball = new PIXI.Graphics();
  var x = Math.sin(arc) * ball_distance;
  var y = Math.cos(arc) * ball_distance;

  center_ball.moveTo(0, 0);
  center_ball.lineTo(x, y);

  ball.beginFill(0xFFFFFF);
  ball.x = x;
  ball.y = y;
  ball.radius = ball_radius;
  ball.drawCircle(0, 0, ball.radius);
  ball.endFill();
  existed_balls.push(ball);

  if (show_index) {
    var text = create_text(("000" + waiting.children.length).substr(-2, 2));
    text.rotation = -arc;
    ball.addChild(text);
  }

  core.addChild(ball);

  if (check_collision(ball)) {
    ball.tint = 0xFF0000;
    game_over = true;
  } else {
    set_waiting(--waiting_count);
  }
}

function set_waiting(count) {
  waiting.removeChildren();
  for (var i = count, il = 0; i > il; i--) {
    var ball = new PIXI.Graphics();
    ball.beginFill(0xFFFFFF);
    ball.x = 0;
    ball.y = i * (ball_radius * 2 + 5);
    ball.drawCircle(0, 0, ball_radius);
    ball.endFill();
    var text = create_text(("0000" + (count - i + 1)).substr(-2, 2));
    ball.addChild(text);
    waiting.addChild(ball);
  }
}

function check_collision(target) {
  if (existed_balls.length <= 1) return false;
  var bump = new Bump(PIXI);
  for (var i = 0, il = existed_balls.length; i < il; i++) {
    var item = existed_balls[i];
    if (item != target && bump.hitTestCircle(target, item)) return true;
  }
  return false;
}

function init(level) {
  var data = level_data[level];
  speed = data.speed;
  var arc = Math.PI / 180 * (360 / data.initCount);
  for (var i = 0; i < data.initCount; i++) {
    create_ball(arc * i);
  }
  waiting_count = data.waitCount;
  set_waiting(waiting_count);

  var text = create_text(("0000" + level).substr(-2, 2), 32);
  text.x = core.x;
  text.y = core.y;
  stage.addChild(text);
}

canvas.addEventListener('click', function (e) {
  if (game_over) return;
  create_ball(core.rotation, true)
  renderer.render(stage);
});

init(3);

(function renderFrame() {
  renderer.render(stage);
  var next_action
  if (game_over) {
    next_action = function () { alert("Game Over!"); };
  } else if (!waiting_count) {
    next_action = function () { alert("Success!"); };
  } else {
    core.rotation += Math.PI * 2 / fps / speed;
    next_action = function () { renderFrame(); };
  }
  setTimeout(next_action, 1000 / fps);
})()
