const canvas = document.querySelector('.can');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height= window.innerHeight;

const Hands = (date) => {
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
}

function renderHands(hands) {
  const { innerWidth: w } = window;
  const cX = w/2;
  const cY = 150;
  const offset = 1/2*Math.PI;

  _.forOwn(hands, function(value, key) {
    const { count, units, length, color, lineWidth } = value;
    // Calculate angle (theta) and determine 
    // the cartesian coords of the ending (x, y)
    // of each line using basic trig. 
    // Remeber 'SohCahToa'???
    const theta = count%units * 360/units * Math.PI/180;
    const d = length;
    const endX = cX + d * Math.cos(theta - offset);
    const endY = cY + d * Math.sin(theta - offset);
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
  const { innerWidth: w } = window;
  // Outer circle
  ctx.strokeStyle = '#FFF';
  ctx.beginPath();
  ctx.lineWidth = 7;
  ctx.arc(w/2, 150, 80, 0, 2*Math.PI);
  ctx.stroke();
  // Inner circle
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.arc(w/2, 150, 4, 0, 2*Math.PI);
  ctx.stroke();
}

function frame() {
  const { innerWidth: w, innerHeight: h } = window;
  ctx.clearRect(0, 0, w, h);
  const date = new Date();
  const hands = Hands(date);
  renderHands(hands);
  renderClock();
}

// Render tick every second
setInterval(()=>{frame()},1000);
