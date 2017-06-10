'use strict';

var canvas = document.querySelector('.can');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var Hands = function Hands(date) {
  return Object.assign({
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
  var h = _window.innerHeight;

  var cX = w / 2;
  var cY = h / 2;
  var offset = 1 / 2 * Math.PI;

  for (var i in hands) {
    var _hands$i = hands[i];
    var count = _hands$i.count;
    var units = _hands$i.units;
    var length = _hands$i.length;
    var color = _hands$i.color;
    var lineWidth = _hands$i.lineWidth;

    var theta = count % units * 360 / units * Math.PI / 180;
    var d = length;
    var endX = cX + d * Math.cos(theta - offset);
    var endY = cY + d * Math.sin(theta - offset);

    ctx.strokeStyle = hands[i].color;
    ctx.lineWidth = hands[i].lineWidth;
    ctx.beginPath();
    ctx.moveTo(cX, cY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
}

function renderClock() {
  var _window2 = window;
  var w = _window2.innerWidth;
  var h = _window2.innerHeight;

  ctx.strokeStyle = '#FFF';
  ctx.beginPath();
  ctx.lineWidth = 7;
  ctx.arc(w / 2, h / 2, 80, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.arc(w / 2, h / 2, 6, 0, 2 * Math.PI);
  ctx.stroke();
}

function render() {
  var _window3 = window;
  var w = _window3.innerWidth;
  var h = _window3.innerHeight;

  ctx.clearRect(0, 0, w, h);
  var hands = Hands(new Date());
  renderHands(hands);
  renderClock();
}

// Tick every second
setInterval(function () {
  render();
}, 1000);