import { createGrid } from './create_grid.js'
import { startGame } from './start_game.js'

let isGameStarted = false;
function Pac_Man() {

    const startButton = document.getElementById("start-button");
    const intro = document.getElementById("intro");
    const pattern = document.getElementById("pattern");
    const pause = document.getElementById("pause");
    if (!isGameStarted) {
        pattern.style.display = "block";
        pause.style.display = "none"

    }
    startButton.addEventListener("click", () => {

        if (!isGameStarted) {
            pause.style.display = "block"
            pattern.style.display = "none";
            intro.play();
            isGameStarted = true;
            startButton.textContent = "Home";
            // intro.pause();
            createGrid();
            startGame();
        } else {
            document.location.reload();
        }
    });





}

window.addEventListener("resize", () => {

    location.reload();
});

Pac_Man()


