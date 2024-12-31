import {createGrid} from './create_grid.js'
// import {movePacMan} from './move-pac.js'
import {startGame} from './start_game.js'

let isGameStarted = false;
export function sounds(){
    document.addEventListener("DOMContentLoaded", () => {
        const startButton = document.getElementById("start-button");
        const audio = document.getElementById("audio");
        const pattern = document.getElementById("pattern");
        const pause = document.getElementById("pause");
        // const death = document.getElementById("death");
        // console.log(isGameStarted)
        if (!isGameStarted) {
            pattern.style.display = "block";
            pause.style.display = "none"
            
        }
        startButton.addEventListener("click", () => {
         
            if (!isGameStarted) {
            pause.style.display = "block"

                pattern.style.display = "none";
                audio.play();
                isGameStarted = true;
                startButton.textContent = "Home";
                // audio.pause();
                createGrid();
                startGame();
            } else {
                document.location.reload();
            }
        });
    });
}
// export const sounds  = 