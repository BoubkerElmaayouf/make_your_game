import {sounds} from './sounds.js'

sounds()


// const scoreDisplay = document.getElementById("score");

// Map layout
// 0 - pac-dots
// 1 - wall
// 2 - ghost-lair
// 3 - power-pellet
// 4 - empty
// const layout = [
//     1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
//     1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//     1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
//     1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
//     1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
//     1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//     1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
//     1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
//     1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//     1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
//     1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
//     1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
//     1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
//     1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//     1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
//     1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
//     1, 0, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 0, 1,
//     1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//     1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
//     1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
//     1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
//     1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
//     1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
//     1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
//     1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
//     1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
//     1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
//     1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
// ]

// const width = 28;
// let indexs = []

// function createGrid() {
//     layout.forEach((cell, index) => {
//         indexs.push(index)
//         const square = document.createElement("div");
//         square.setAttribute("data-index", index);
//         square.setAttribute("data-value", cell);
//         switch(cell) {
//             case 0:   
//                 square.classList.add("pac-dot");
//                 break;
//             case 1:
//                 square.classList.add("wall");
//                 break;
//             case 2:
//                 square.classList.add("ghost-lair");
//                 // square.textContent = index
//                 if (index === 347 || index === 352 || index === 408 || index === 403) {
//                     square.classList.add("ghost");
//                     if (index === 347) square.classList.add("pinky");
//                     if (index === 352) square.classList.add("blinky");
//                     if (index === 408) square.classList.add("inky");
//                     if (index === 403) square.classList.add("clyde");
//                 }
//                 break;
//             case 3:
//                 square.classList.add("power-pellet");
//                 break;
//             case 5:
//                 square.classList.add("pac-man");
//                 break;
//             // case 4 is empty, no class needed
//         }
//         if (index === 489) {
//             square.classList.add("pac-man");
//             // square.style.height = "16px"
//             // square.style.width = "16px"
//         }
//         grid.appendChild(square);
//     });
// }

// const ghostPosition = { x: 0, y: 0 };
// const ghostRotation = 0;

// function randomposition() {
//     const ghosts = document.querySelectorAll(".ghost");
//     ghosts.forEach((ghost) => {
//         ghostPosition.x = Math.floor(Math.random() * width) * 20;
//         ghostPosition.y = Math.floor(Math.random() * width) * 20;
//         ghost.style.transform = `translate(${ghostPosition.x}px, ${ghostPosition.y}px)`;
//     });
// }

// export function ghostMove() {
//     const ghosts = document.querySelectorAll(".ghost");
//     ghosts.forEach((ghost) => {
//         // randomposition()
//         console.log("ghost classes" , ghost);
//         // check for every ghost pinky blinky inky clyde, and move them
//         if (ghost.classList.contains("pinky")) {
//             ghost.style.transform = `translate(${ghostPosition.x + 0}px, ${ghostPosition.y + 0}px)`;
//         }else if (ghost.classList.contains("blinky")) {
//             ghost.style.transform = `translate(${ghostPosition.x + 0}px, ${ghostPosition.y - 0}px)`;
//         } else if (ghost.classList.contains("inky")) {
//             ghost.style.transform = `translate(${ghostPosition.x + 0}px, ${ghostPosition.y + 0}px)`;
//         } else if (ghost.classList.contains("clyde")) {
//             ghost.style.transform = `translate(${ghostPosition.x + 0}px, ${ghostPosition.y + 0}px)`;
//         }
//     });
// }





// let isGameStarted = false;

// document.addEventListener("DOMContentLoaded", () => {
//     const startButton = document.getElementById("start-button");
//     const audio = document.getElementById("audio");
//     const pattern = document.getElementById("pattern");
//     // const death = document.getElementById("death");
//     // console.log(isGameStarted)
//     if (!isGameStarted) {
//         pattern.style.display = "block";
//         audio.play();
//     }
//     startButton.addEventListener("click", () => {
     
//         if (!isGameStarted) {
//             pattern.style.display = "none";

//             isGameStarted = true;
//             startButton.textContent = "Restart";
//             audio.pause();
//             createGrid();
//             startGame();
//         } else {
//             document.location.reload();
//         }
//     });
// });


