// import {ghostMove} from './script.js'
import { createGrid} from "./create_grid.js";
import {
     movePacMan,
    ghost_dead,
 } from "./move-pac.js";

let startTime = Date.now();
export const scoreDisplay = document.getElementById("score");
export const lifesDisplay = document.getElementById("lifes");
export const  timeDisplay = document.getElementById("Time");
export let pinky_y_x = { x: 0, y: 0 };
export let inky_y_x = { x: 0, y: 0 };
export let  blinky_y_x = { x: 0, y: 0 };
export let  clyde_y_x = { x: 0, y: 0 };
let lifes = 3;
let lastFrameTime = 0;
let animationId;
const speed = 50; // Movement speed in pixels per frame

let speedghost = 1;
let score = 0;

export function resite() {
    blinky_y_x = { x: 0, y: 0 };
    inky_y_x = { x: 0, y: 0 };
    pinky_y_x = { x: 0, y: 0 };
    clyde_y_x = { x: 0, y: 0 };
}

function gameLoop(timestamp) {
    const deltaTime = timestamp - lastFrameTime;

    if (deltaTime >= speed) {
        movePacMan();
        updateTime();
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
function GhostDead(ghost) {
    const pacMan = document.querySelector('.pac-man');
    
    const ghostRect = ghost.getBoundingClientRect();
    const pacManRect = pacMan.getBoundingClientRect();
            if (
                pacManRect.left < ghostRect.right &&
                pacManRect.right > ghostRect.left &&
                pacManRect.top < ghostRect.bottom &&
                pacManRect.bottom > ghostRect.top
            ) {
                return true;
            }
        
        return false;
    }

 function movegostpinky() {
     const pinky = document.querySelector('.pinky');
    
     let move = NextMoveGost();
     function updatePosition() {
         let newX = pinky_y_x.x;
         let newY = pinky_y_x.y;
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
            pinky_y_x.x = newX;
            pinky_y_x.y = newY;
        } else {
             move = NextMoveGost(move);
         }
         if (GhostDead(pinky) && ghost_dead) {
            pinky.style.transform = `translate(0px, 0px)`;
            pinky.classList.remove("ghost_dead");
            pinky_y_x.x = 0;
            pinky_y_x.y = 0;
         }
         pinky.style.transform = `translate(${pinky_y_x.x}px, ${ pinky_y_x.y}px)`;
 
         requestAnimationFrame(updatePosition);
     }
 
     requestAnimationFrame(updatePosition);
 }
 function movegostblinky() {
     const blinky = document.querySelector('.blinky');
 
     let move = NextMoveGost();
     function updatePosition() {
         let newX = blinky_y_x.x;
         let newY = blinky_y_x.y;
 
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
            blinky_y_x.x = newX;
            blinky_y_x.y = newY;
         }  else {
             move = NextMoveGost(move);
         }
         if (GhostDead(blinky) && ghost_dead) {
            blinky.style.transform = `translate(0px, 0px)`;
            blinky.classList.remove("ghost_dead");
            blinky_y_x.x = 0;
            blinky_y_x.y = 0;
            console.log("Game Over blinky");
                 }
 
         blinky.style.transform = `translate(${blinky_y_x.x}px, ${blinky_y_x.y}px)`;
 
         requestAnimationFrame(updatePosition);
     }
 
     requestAnimationFrame(updatePosition);
 }
 function movegostinky() {
     const inky = document.querySelector('.inky');
     
 
     let move = NextMoveGost();
     function updatePosition() {
         let newX = inky_y_x.x;
         let newY = inky_y_x.y;
 
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
            inky_y_x.x = newX;
            inky_y_x.y = newY;
        }  else {
             move = NextMoveGost(move);
         }
         if (GhostDead(inky) && ghost_dead) {
            inky.style.transform = `translate(0px, 0px)`;
            console.log("Game Over inky");
            inky.classList.remove("ghost_dead");
           inky_y_x.x = 0;  
              inky_y_x.y = 0;
         }
         inky.style.transform = `translate(${inky_y_x.x}px, ${inky_y_x.y}px)`;
 
         requestAnimationFrame(updatePosition);
     }
 
     requestAnimationFrame(updatePosition);
 }
 function movegostclyde() {
     const clyde = document.querySelector('.clyde');
 
     let move = NextMoveGost();
     function updatePosition() {
         let newX = clyde_y_x.x;
         let newY = clyde_y_x.y;
 
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
            clyde_y_x.x = newX;
            clyde_y_x.y = newY;
        } else {
             move = NextMoveGost(move);
         }
         if (GhostDead(clyde) && ghost_dead) {
            clyde.style.transform = `translate(0px, 0px)`;
            console.log("Game Over clyde");
            clyde.classList.remove("ghost_dead");
            clyde_y_x.x = 0;
            clyde_y_x.y = 0;
         }
 
         clyde.style.transform = `translate(${clyde_y_x.x}px, ${clyde_y_x.y}px)`;
 
         requestAnimationFrame(updatePosition);
     }
 
     requestAnimationFrame(updatePosition);
 }