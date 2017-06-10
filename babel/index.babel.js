const canvas = document.querySelector('.can');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height= window.innerHeight;

const Hands = (date) => {
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
}

function renderHands(hands) {
  const { innerWidth: w, innerHeight: h } = window;
  const cX = w/2;
  const cY = h/2;
  const offset = 1/2*Math.PI;

  for (let i in hands) {
    const { count, units, length, color, lineWidth } = hands[i];
    const theta = count%units * 360/units * Math.PI/180;
    const d = length;
    const endX = cX + d * Math.cos(theta - offset);
    const endY = cY + d * Math.sin(theta - offset);
    
    ctx.strokeStyle = hands[i].color;
    ctx.lineWidth = hands[i].lineWidth;
    ctx.beginPath();
    ctx.moveTo(cX, cY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
  }
  
}

function renderClock() {
  const { innerWidth: w, innerHeight: h } = window;

  ctx.strokeStyle = '#FFF';
  ctx.beginPath();
  ctx.lineWidth = 7;
  ctx.arc(w/2, h/2, 80, 0, 2*Math.PI);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.arc(w/2, h/2, 6, 0, 2*Math.PI);
  ctx.stroke();

}

function render() {
  const { innerWidth: w, innerHeight: h } = window;
  ctx.clearRect(0, 0, w, h);
  const hands = Hands(new Date());
  renderHands(hands);
  renderClock();
}

// Tick every second
setInterval(() => { render() }, 1000);



