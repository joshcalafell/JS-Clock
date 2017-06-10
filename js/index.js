'use strict';

var canvas = document.querySelector('.can');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var Hands = function Hands(date) {
  return _.assign({
    'hours': {
      'units': 12,
      'length': 50,
      'color': '#F00',
      'lineWidth': 6,
      'count': date.getHours()
    },
    'minutes': {
      'units': 60,
      'length': 65,
      'color': '#DDD',
      'lineWidth': 4,
      'count': date.getMinutes()
    },
    'seconds': {
      'units': 60,
      'length': 80,
      'color': '#FFF',
      'lineWidth': 4,
      'count': date.getSeconds()
    }
  });
};

function renderHands(hands) {
  var _window = window;
  var w = _window.innerWidth;

  var cX = w / 2;
  var cY = 150;
  var offset = 1 / 2 * Math.PI;

  _.forOwn(hands, function (value, key) {
    var count = value.count;
    var units = value.units;
    var length = value.length;
    var color = value.color;
    var lineWidth = value.lineWidth;
    // Calculate angle (theta) and determine
    // the cartesian coords of the ending (x, y)
    // of each line using basic trig.
    // Remeber 'SohCahToa'???

    var theta = count % units * 360 / units * Math.PI / 180;
    var d = length;
    var endX = cX + d * Math.cos(theta - offset);
    var endY = cY + d * Math.sin(theta - offset);
    // Stroke
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(cX, cY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  });
}

function renderClock() {
  var _window2 = window;
  var w = _window2.innerWidth;
  // Outer circle

  ctx.strokeStyle = '#FFF';
  ctx.beginPath();
  ctx.lineWidth = 7;
  ctx.arc(w / 2, 150, 80, 0, 2 * Math.PI);
  ctx.stroke();
  // Inner circle
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.arc(w / 2, 150, 4, 0, 2 * Math.PI);
  ctx.stroke();
}

/**
* Render one frame
*/
function frame() {
  var _window3 = window;
  var w = _window3.innerWidth;
  var h = _window3.innerHeight;

  ctx.clearRect(0, 0, w, h);
  var date = new Date();
  var hands = Hands(date);
  renderHands(hands);
  renderClock();
}

// Render tick every second
setInterval(function () {
  frame();
}, 1000);