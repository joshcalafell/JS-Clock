const canvas = document.querySelector('.can');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height= window.innerHeight;

const ClockNumbers = () => {
  return new Array(12).fill(undefined).map((val, idx) => {
    const { innerWidth: w } = window;
    const cX = w/2-3;
    const cY = 155;
    const offset = 1/2*Math.PI;
    const theta = idx*5*5 * 360/12 * Math.PI/180;
    const endX = cX + 100 * Math.cos(theta - offset);
    const endY = cY + 100 * Math.sin(theta - offset);
    return _.assign({
      unit: idx || 12,
      start: { x: w/2, y: 150 },
      end: { x: endX, y: endY }
    });
  });
}

const ClockHands = (date) => {
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
  }].map((hand, idx) => {
    const { innerWidth: w } = window;
    const cX = w/2;
    const cY = 155;
    const offset = 1/2*Math.PI;
    const theta = hand.count%hand.max 
      * 360/hand.max 
      * Math.PI/180;
    const endX = cX + hand.length * Math.cos(theta - offset);
    const endY = cY + hand.length * Math.sin(theta - offset);
    return _.assign({}, hand, {
      start: { x: w/2, y: 150 },
      end: { x: endX, y: endY }
    });
  });
}

function renderClockNumbers(numbers) {
  _.forEach(numbers, (number, idx) => {
    ctx.fillStyle = '#FFF';
    ctx.font = '12px Acme';
    ctx.fillText(
      number.unit,
      number.end.x,
      number.end.y
    );  
  });
}

function renderClockHands(hands) {
  _.forEach(hands, (hand, idx) => {
    ctx.strokeStyle = hand.color;
    ctx.lineWidth = hand.width;
    ctx.beginPath();
    ctx.moveTo(hand.start.x, hand.start.y);
    ctx.lineTo(hand.end.x, hand.end.y);
    ctx.stroke(); 
  });
}

function renderClockOutline() {
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
  const hands = ClockHands(date);
  const numbers = ClockNumbers();
  renderClockHands(hands);
  renderClockNumbers(numbers)
  renderClockOutline();
}

// Render tick every second
setInterval(()=>{frame()},1000);
