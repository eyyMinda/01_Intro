let board = [
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]
let solved = [
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]
let current = [
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------",
    "---------"
]
let numbers, digits, numSelected;
let wrong = 0, isSolved = false;

const boardField = document.getElementById('board')
const digitsField = document.getElementById('digits')
const faults = document.getElementById('faults')

window.onload = function () { renderDigits(); getNewBoard() }

function renderDigits() {
    digitsField.innerHTML = ''
    for (let i = 1; i < 10; i++) {
        let digit = document.createElement('div');
        digit.classList.add('digit');
        digit.textContent = i;
        digit.addEventListener('click', selectNum);
        digitsField.appendChild(digit);
    }
}

function renderGame(param) {
    if (param === solved) { isSolved = true } else { isSolved = false }
    current = board
    boardField.innerHTML = ''

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement('div')
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add('tile')
            tile.addEventListener('click', selectTile);
            if (r == 2 || r == 5) { tile.classList.add('horizontal-seperation') }
            if (c == 2 || c == 5) { tile.classList.add('vertical-seperation') }
            if (param[r][c] !== '-' && param[r][c] !== 0) {
                tile.textContent = param[r][c]
                tile.classList.add('tile-start')
            }
            boardField.appendChild(tile)
        }
    }
}

function selectNum() {
    if (numSelected != null) {
        numSelected.classList.remove('selected')
    }
    numSelected = this
    numSelected.classList.add('selected')
}

function selectTile() {
    if (!current.toString().includes('0')) { alert('Great job logic boy!'); return } else
        if (isSolved) { alert('It would be nice if you would solve it yourself, but you know... you do you.') }
        else { console.log('Keep going!') }
    let a = this.id.split('-');
    if (numSelected) {
        if (solved[a[0]][a[1]] !== Number(numSelected.textContent)) {
            wrong++;
            faults.innerHTML = `Wrong attempts: ${wrong}`;
            return
        }
        if (this.innerText == '') {
            this.innerText = numSelected.textContent
            current[a[0]][a[1]] = Number(numSelected.textContent)
        }
    }
}













String.prototype.replaceAt = function (index, char) { //Replace a number in a tile \\ Works only if board is an array of strings
    var a = this.split("");
    a[index] = char;
    return a.join("");
}
// current[a[0]] = current[a[0]].replaceAt(a[1], numSelected.textContent) //For array of Strings
