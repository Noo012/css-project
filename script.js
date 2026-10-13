const cat = document.getElementById('cat');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let catX = mouseX;
let catY = mouseY;
let targetRotation = 0;
let currentRotation = 0;

let idleTimer;

function moveCat() {
  const deltaX = mouseX - catX;
  const deltaY = mouseY - catY;
  
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  targetRotation = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  
  const desiredDistance = 80;
  
  if (distance > desiredDistance) {
    const angle = Math.atan2(deltaY, deltaX);
    catX = mouseX - Math.cos(angle) * desiredDistance;
    catY = mouseY - Math.sin(angle) * desiredDistance;
  }

  cat.style.left = `${catX}px`;
  cat.style.top = `${catY}px`;
  
  let diff = targetRotation - currentRotation;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  
  currentRotation += diff * 0.05;
  
  cat.style.transform = `translate(-50%, -50%) rotate(${currentRotation}deg)`;

  requestAnimationFrame(moveCat);
}

document.addEventListener('pointermove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cat.classList.remove('idle');

  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    cat.classList.add('idle');
  }, 220);
});

moveCat();