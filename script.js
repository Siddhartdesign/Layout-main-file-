// Elements
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 📌 Always resize canvas to fill the screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// 📌 SIMPLE, RELIABLE CAMERA REQUEST
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    alert("Camera error: " + err);
  });

// 📌 Array to store dots
let dots = [];

// 📌 Draw everything
function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw dots
  for (const d of dots) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(d.x, d.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 📌 Add dot on tap
canvas.addEventListener("pointerdown", e => {
  const x = e.clientX;
  const y = e.clientY;

  dots.push({ x, y });
  redraw();
});
