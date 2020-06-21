const canvas = document.querySelector("canvas");

let canvasWidth = window.innerWidth - 20;
let canvasHeight = window.innerHeight - 20;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const c = canvas.getContext("2d");

// c.fillStyle = "rgba(255,0,0,0.4)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0,255,0,0.4)";
// c.fillRect(200, 300, 100, 100);
// c.fillStyle = "rgba(0,0,255,0.4)";
// c.fillRect(300, 400, 100, 100);

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#ff5000";
// c.stroke();

// for (let n = 0; n < 100; n++) {
//   const x = Math.random() * window.innerWidth;
//   const y = Math.random() * window.innerHeight;
//   c.beginPath();
//   c.arc(x, y, 30, 0, Math.PI * 2, false);
//   c.strokeStyle = "blue";
//   c.stroke();
// }

// let x = Math.random() * canvasWidth;
// let y = Math.random() * canvasHeight;
// let dx = (Math.random() - 0.5) * 8;
// let dy = (Math.random() - 0.5) * 8;
// const radius = 30;

// c.beginPath();
// c.arc(x, y, radius, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

let mouse = { x: undefined, y: undefined };
const maxRadius = 40;
const minRadius = 2;

const colorArray = ["#9B1D20", "#3D2B3D", "#635d5c", "#cbefb6", "#d0ffce"];

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function(event) {
  canvasWidth = window.innerWidth - 20;
  canvasHeight = window.innerHeight - 20;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function() {
    if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

let circleArray = [];

function init() {
  circleArray = [];
  for (let i = 0; i < 800; i++) {
    const radius = Math.random() * 3 + 1;
    let x = Math.random() * (canvasWidth - radius * 2) + radius;
    let y = Math.random() * (canvasHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 0.5;
    let dy = (Math.random() - 0.5) * 0.5;

    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let x = 0; x < circleArray.length; x++) {
    const circle = circleArray[x];
    circle.update();
  }
}

init();
animate();
