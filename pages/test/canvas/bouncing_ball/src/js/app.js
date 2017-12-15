// minifyOnSave, filenamePattern: ../../min/js/$1.$2, minifier: gcc, buffer: 8388608, minifierOptions: "charset = utf-8 nomunge language_out=ES5"

var gridContainer = null;

var balls = [];

includeHTML(function() {
  addButton('Back', '../../canvas.html');

  document.getElementById('title-text').innerText = document.title = 'Bouncing Ball';
  document.getElementById('intro').innerHTML = '<i class="material-icons"">touch_app</i>Touch it!';

  gridContainer = document.getElementById('grid-container');

  gridContainer.appendChild(canvas);
  canvas.width = gridContainer.clientWidth;
  canvas.height = gridContainer.clientHeight;

  generate();
  updateEnable();
});

function generate() {
  canvas.width = gridContainer.clientWidth;
  canvas.height = gridContainer.clientHeight;
  updateRelativeSize();

  balls = [];
  var tryTime = 0;
  while (balls.length < 30 && tryTime < 10000) {
    var x = rand(0, canvas.width);
    var y = rand(0, canvas.height);
    var radius = rand(3, 5, 7);
    var speed = rand(5 / radius, 10 / radius, 7);
    var direction = angleToDirection(rand(0, Math.PI, 7));
    var velocityX = direction.x * speed * plusOrMinus();
    var velocityY = direction.y * speed * plusOrMinus();
    var color = new ColorHSLA(rand(0, 360));

    var ball = new Ball(x, y, radius, velocityX, velocityY, speed, color);

    var relativeRadius = getRelativeSize(ball.radius);
    var colision = ball.x < relativeRadius || ball.x > canvas.width - relativeRadius || ball.y < relativeRadius || ball.y > canvas.height - relativeRadius;
    if (!colision)
      for (i in balls)
        if (ball.colision(balls[i])) {
          colision = true;
          break;
        }
    if (!colision)
      balls.push(ball);
    else
      tryTime++;
  }
  balls.push(new Ball(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 20, 0, 0, 0, new ColorHSLA(0, 100, 50, 0.5)));
  render();
}

function move() {
  var mouSeBall = balls[balls.length - 1];
  for (i in balls) {
    if (balls[i] == mouSeBall)
      continue;
    var next = balls[i].next();
    var relativeRadius = getRelativeSize(balls[i].radius);
    for (j in balls) {
      if (i != j && balls[i].colision(balls[j])) {
        var direction = angleToDirection(Math.atan2(balls[j].x - balls[i].x, balls[j].y - balls[i].y));
        var overlap = relativeRadius + getRelativeSize(balls[j].radius) - distance(balls[i], balls[j]);
        balls[i].velocityX += direction.x * overlap;
        balls[i].velocityY += direction.y * overlap;
        balls[j].velocityX -= direction.x;
        balls[j].velocityY -= direction.y;
      }
    }
    if (next.x < relativeRadius) {
      next.x = relativeRadius;
      balls[i].velocityX *= -1;
    }
    if (next.x > canvas.width - relativeRadius) {
      next.x = canvas.width - relativeRadius;
      balls[i].velocityX *= -1;
    }
    if (next.y < relativeRadius) {
      next.y = relativeRadius;
      balls[i].velocityY *= -1;
    }
    if (next.y > canvas.height - relativeRadius) {
      next.y = canvas.height - relativeRadius;
      balls[i].velocityY *= -1;
    }
    balls[i].set(next);
    var rawVelocity = angleToDirection(Math.atan2(balls[i].velocityX, balls[i].velocityY));
    rawVelocity.multiply(balls[i].speed * relativeSize);
    balls[i].velocityX -= (balls[i].velocityX * 9 + rawVelocity.x) / 10;
    balls[i].velocityY -= (balls[i].velocityY * 9 + rawVelocity.y) / 10;
  }

  mouSeBall.color.h = ++mouSeBall.color.h % 361;
}

function render() {
  canvas.width = gridContainer.clientWidth;
  canvas.height = gridContainer.clientHeight;

  updateRelativeSize(balls);

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (i in balls) {
    context.beginPath();
    context.fillStyle = balls[i].color.toString();
    context.shadowBlur = 2 * relativeSize;
    context.shadowColor = context.fillStyle;
    context.arc(balls[i].x, balls[i].y, getRelativeSize(balls[i].radius), 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
  }
}

function onUpdate() {
  move();
  render();
}

document.body.addEventListener('mousemove', function(evt) {
  var rect = canvas.getBoundingClientRect();
  balls[balls.length - 1].x = evt.clientX - rect.left;
  balls[balls.length - 1].y = evt.clientY - rect.top;
}, false);

document.body.addEventListener("touchmove", function(evt) {
  var rect = canvas.getBoundingClientRect();
  balls[balls.length - 1].x = evt.touches[0].clientX - rect.left;
  balls[balls.length - 1].y = evt.touches[0].clientY - rect.top;
}, false);

document.body.addEventListener("touchend", function(evt) {
  balls[balls.length - 1].x = Number.MAX_SAFE_INTEGER;
  balls[balls.length - 1].y = Number.MAX_SAFE_INTEGER;
}, false);
