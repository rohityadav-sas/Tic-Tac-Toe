const box = document.querySelectorAll('.box');
let turn = 'X';
let winner = '';
let gameOver = false;
const wins = [
    [0, 1, 2, 16, 5, 0, 90],
    [3, 4, 5, 49, 5, 0, 90],
    [6, 7, 8, 82, 5, 0, 90],
    [0, 3, 6, 0, 17, 90, 100],
    [1, 4, 7, 0, 50, 90, 100],
    [2, 5, 8, 0, 83, 90, 100],
    [0, 4, 8, 4, 5, 45, 125],
    [6, 4, 2, 95, 5, -45, 125]
];
winnerText.innerText = `Turn for ${turn}`;
box.forEach(e => {
    e.addEventListener('mouseover', hover)
    e.addEventListener('mouseout', empty)
    e.addEventListener('click', click);
})

function turnChange() {
    (turn === 'X') ? (turn = '0') : (turn = 'X');
    winnerText.innerText = `Turn for ${turn}`;
}

function hover() {
    if (!gameOver) {
        this.style.color = 'rgba(128,128,128,0.3)';
        this.innerText = `${turn}`;
    }
}

function empty() {
    this.innerText = '';
}

function click() {
    if (!gameOver) {
        this.style.color = 'rgba(0,0,0,1)';
        this.innerText = `${turn}`;
        turnChange();
        checkDraw();
        checkWin();
        this.removeEventListener('mouseover', hover);
        this.removeEventListener('mouseout', empty);
        this.removeEventListener('click', click);
    }
}

function gameRestart() {
    gameOver = false;
    winner = '';
    winnerText.innerText = `Turn for ${turn}`;
    line.style.width = 0;
    box.forEach(a => {
        a.innerText = '';
        a.addEventListener('mouseover', hover);
        a.addEventListener('mouseout', empty);
        a.addEventListener('click', click);
    })
}

function checkWin() {
    for (let i = 0; i < wins.length; i++) {
        if (box[wins[i][0]].innerText !== '' && box[wins[i][0]].innerText === box[wins[i][1]].innerText && box[wins[i][0]].innerText === box[wins[i][2]].innerText) {
            winner = box[wins[i][0]].innerText;
            winnerText.innerText = `The winner is ${winner}`;
            gameOver = true;
            line.style.top = `${wins[i][3]}%`;
            line.style.left = `${wins[i][4]}%`;
            line.style.transform = `rotate(${wins[i][5]}deg)`;
            line.style.width = `${wins[i][6]}%`;
            if (winner === 'X') { win_x.innerText = parseInt(win_x.innerText) + 1; break; }
            else if (winner === '0') { win_0.innerText = parseInt(win_0.innerText) + 1; break; }
        }
    }
}

function checkDraw() {
    for (let i = 0; i < box.length; i++) {
        if (box[i].innerText === '') { return; }
    }
    winnerText.innerText = 'GAME DRAW!!!';
}