// import {ghostMove} from './script.js'
import { createGrid} from "./create_grid.js";
import { movePacMan } from "./move-pac.js";

let startTime = Date.now();
export const scoreDisplay = document.getElementById("score");
export const lifesDisplay = document.getElementById("lifes");
export const  timeDisplay = document.getElementById("Time");
let lifes = 3;
let lastFrameTime = 0;
let animationId;
const speed = 50; // Movement speed in pixels per frame

let speedghost = 1;
let score = 0;

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastFrameTime;

    if (deltaTime >= speed) {
        movePacMan();
        updateTime();
        //GameOver()
        lastFrameTime = timestamp;
    }
 

    animationId = requestAnimationFrame(gameLoop);
  }


export function startGame() {
       scoreDisplay.textContent = score;
       lifesDisplay.textContent = lifes;
       timeDisplay.textContent = 0;
       movegostinky()
       movegostblinky()
       movegostpinky()
       movegostclyde()

    //    createGrid();
       const pattern = document.getElementById("pattern");
       pattern.style.display = "none"
       // pacMan.style.transform = `translate( ${pacManPosition.x}px, ${pacManPosition.y}px)`;
       lastFrameTime = performance.now();
       animationId = requestAnimationFrame(gameLoop);
}

function updateTime() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timeDisplay.textContent = elapsedTime;
}
   
function NextMoveGost(move) {
    if (move === 'left' || move === 'right') {
        const moves = ['up','down']
        return moves[Math.floor(moves.length * Math.random())]  
    }else if (move === 'up' || move === 'down') {
        const moves1 = ['left', 'right']
        return moves1[Math.floor(moves1.length * Math.random())]
    }else{
        const moves2 = ['left', 'right', 'up', 'down']
        return moves2[Math.floor(moves2.length * Math.random())]
    }
    
 }
 function checkCollision(X, Y,ghost) {
     const walls = document.querySelectorAll('.wall');
     ghost.style.transform = `translate(${X}px, ${Y}px)`;
     const ghostRect = ghost.getBoundingClientRect();
 
     for (const wall of walls) {
         const wallRect = wall.getBoundingClientRect();
         if (
             ghostRect.left < wallRect.right &&
             ghostRect.right > wallRect.left &&
             ghostRect.top < wallRect.bottom &&
             ghostRect.bottom > wallRect.top
         ) {
             return true;
         }
     }
     return false;
 }

 function movegostpinky() {
     const pinky = document.querySelector('.pinky');
     let x = 0;
     let y = 0;

 
     let move = NextMoveGost();
     function updatePosition() {
         let newX = x;
         let newY = y;
 if (newX == 55  && newY == 0) {
     newY -= speedghost
 }else if (move === 'left') {
             newX -= speedghost;
         } else if (move === 'right') {
             newX += speedghost;
         } else if (move === 'up') {
             newY -= speedghost;
         } else if (move === 'down') {
             newY += speedghost;
         }
 
         if (!checkCollision(newX, newY,pinky)) {
             x = newX;
             y = newY;
         } else {
             move = NextMoveGost(move);
         }
 
         pinky.style.transform = `translate(${x}px, ${y}px)`;
 
         requestAnimationFrame(updatePosition);
     }
 
     requestAnimationFrame(updatePosition);
 }
 function movegostblinky() {
     const blinky = document.querySelector('.blinky');
     let x = 0;
     let y = 0;
 
     let move = NextMoveGost();
     function updatePosition() {
         let newX = x;
         let newY = y;
 
         if (newX == -59 && newY == 0) {
             newY -= speedghost
         }else if (move === 'left') {
             newX -= speedghost;
         } else if (move === 'right') {
             newX += speedghost;
         } else if (move === 'up') {
             newY -= speedghost;
         } else if (move === 'down') {
             newY += speedghost;
         }
 
         if (!checkCollision(newX, newY,blinky)) {
             x = newX;
             y = newY;
         } else {
             move = NextMoveGost(move);
         }
 
         blinky.style.transform = `translate(${x}px, ${y}px)`;
 
         requestAnimationFrame(updatePosition);
     }
 
     requestAnimationFrame(updatePosition);
 }
 function movegostinky() {
     const inky = document.querySelector('.inky');
     let x = 0;
     let y = 0;
 
     let move = NextMoveGost();
     function updatePosition() {
         let newX = x;
         let newY = y;
 
         if (newX == -55  && newY == -40) {
             newY -= speedghost
         }else  if (move === 'left') {
             newX -= speedghost;
         } else if (move === 'right') {
             newX += speedghost;
         } else if (move === 'up') {
             newY -= speedghost;
         } else if (move === 'down') {
             newY += speedghost;
         }
 
         if (!checkCollision(newX, newY,inky)) {
             x = newX;
             y = newY;
         } else {
             move = NextMoveGost(move);
         }
 
         inky.style.transform = `translate(${x}px, ${y}px)`;
 
         requestAnimationFrame(updatePosition);
     }
 
     requestAnimationFrame(updatePosition);
 }
 function movegostclyde() {
     const clyde = document.querySelector('.clyde');
     let x = 0;
     let y = 0;
 
     let move = NextMoveGost();
     function updatePosition() {
         let newX = x;
         let newY = y;
 
         if (newX == 58  && (newY == -20 || newY == 20)) {
             newY -= speedghost
         }else if (move === 'left') {
             newX -= speedghost;
         } else if (move === 'right') {
             newX += speedghost;
         } else if (move === 'up') {
             newY -= speedghost;
         } else if (move === 'down') {
             newY += speedghost;
         }
 
         if (!checkCollision(newX, newY,clyde)) {
             x = newX;
             y = newY;
         } else {
             move = NextMoveGost(move);
         }
 
         clyde.style.transform = `translate(${x}px, ${y}px)`;
 
         requestAnimationFrame(updatePosition);
     }
 
     requestAnimationFrame(updatePosition);
 }