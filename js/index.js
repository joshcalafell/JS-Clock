'use strict';

var canvas = document.querySelector('.can');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var Coords = function Coords(startX, startY, endX, endY) {
  return {
    start: {
      x: startX,
      y: startY
    },
    end: {
      x: endX,
      y: endY
    }
  };
};

var ClockNumbers = function ClockNumbers() {
  return new Array(12).fill(undefined).map(function (val, idx) {
    var _window = window;
    var w = _window.innerWidth;

    var cX = w / 2 - 3;
    var cY = 155;
    var offset = 1 / 2 * Math.PI;
    var theta = idx * 5 * 5 * 360 / 12 * Math.PI / 180;
    var endX = cX + 100 * Math.cos(theta - offset);
    var endY = cY + 100 * Math.sin(theta - offset);
    return _.assign({
      unit: idx || 12,
      coords: Coords(cX, cY, endX, endY)
    });
  });
};

var ClockHands = function ClockHands(date) {
  return [{
    type: 'hours',
    count: date.getHours(),
    max: 12,
    length: 50,
    color: '#F00',
    width: 5
  }, {
    type: 'minutes',
    count: date.getMinutes(),
    max: 60,
    length: 65,
    color: '#DDD',
    width: 4
  }, {
    type: 'seconds',
    count: date.getSeconds(),
    max: 60,
    length: 80,
    color: '#FFF',
    width: 3
  }].map(function (hand, idx) {
    var _window2 = window;
    var w = _window2.innerWidth;

    var cX = w / 2;
    var cY = 155;
    var offset = 1 / 2 * Math.PI;
    var theta = hand.count % hand.max * 360 / hand.max * Math.PI / 180;
    var endX = cX + hand.length * Math.cos(theta - offset);
    var endY = cY + hand.length * Math.sin(theta - offset);
    return _.assign({}, hand, {
      coords: Coords(cX, cY, endX, endY)
    });
  });
};

function renderClockNumbers(numbers) {
  _.forEach(numbers, function (number, idx) {
    ctx.fillStyle = '#FFF';
    ctx.font = '12px Acme';
    ctx.fillText(number.unit, number.coords.end.x, number.coords.end.y);
  });
}

function renderClockHands(hands) {
  _.forEach(hands, function (hand, idx) {
    ctx.strokeStyle = hand.color;
    ctx.lineWidth = hand.width;
    ctx.beginPath();
    ctx.moveTo(hand.coords.start.x, hand.coords.start.y);
    ctx.lineTo(hand.coords.end.x, hand.coords.end.y);
    ctx.stroke();
  });
}

function renderClockOutline() {
  var _window3 = window;
  var w = _window3.innerWidth;
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

function frame() {
  var _window4 = window;
  var w = _window4.innerWidth;
  var h = _window4.innerHeight;

  ctx.clearRect(0, 0, w, h);
  var date = new Date();
  var hands = ClockHands(date);
  var numbers = ClockNumbers();
  renderClockHands(hands);
  renderClockNumbers(numbers);
  renderClockOutline();
}

// Render tick every second
setInterval(function () {
  frame();
}, 1000);