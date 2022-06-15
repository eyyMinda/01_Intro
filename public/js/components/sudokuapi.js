//https://github.com/bertoort/sugoku ***api docs
const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
const encodeParams = (params) =>
    Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');


function getNewBoard() {
    fetch('https://sugoku.herokuapp.com/board?difficulty=easy').then(response => response.json())
        .then(data => {
            setTimeout(() => {
                board = data.board; renderGame(board); getSolved();
            }, 1)
        })
    wrong = 0;
    faults.innerHTML = `Wrong attempts: ${wrong}`;
}

function getSolved(param) {
    setTimeout(() => {
        const data = { board: board }

        fetch('https://sugoku.herokuapp.com/solve', {
            method: 'POST',
            body: encodeParams(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
            .then(response => response.json())
            .then(response => {
                solved = response.solution
            })
            .catch(console.warn)
    }, 200)
}