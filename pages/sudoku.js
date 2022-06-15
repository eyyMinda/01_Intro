import { PageTemplate } from "../lib/PageTemplate.js";

class PageGameSudoku extends PageTemplate {
    constructor() {
        super();
        this.title = `┼─Sudoku─┼`;
        this.css = `<link rel="stylesheet" href="/css/pages/sudoku.css">`;
        this.js = `<script src="/js/components/sudoku.js" type="text/javascript" defer></script>
        <script src="/js/components/sudokuapi.js" type="text/javascript" defer></script>`;
        this.favicon = `<link rel="apple-touch-icon" sizes="180x180" href="/favicon/sudoku/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/sudoku/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/sudoku/favicon-16x16.png">
        <link rel="manifest" href="/favicon/sudoku/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">`;
        this.meta = `<meta name="description" content="Sudoku">
        <meta name="keywords" content="Bootstrap, CSS, JavaScript, NodeJS, Programming, Sudoku">`
    }
    headHTML() {
        return `<meta charset="UTF-8">
        <meta name="author" content="Mindaugas Straksys">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${this.meta}
        ${this.css}
        ${this.js}
        <title>${this.title}</title>
        ${this.favicon}`;
    }

    headerHTML() {
        return `<h1><a href="/" class="text-start">Home</a></h1>`;
    }

    mainHTML() {
        return `<section class="container">
        <h1>Sudoku</h1>
        <button class="btn" onclick="getNewBoard()">Get New Board</button>
        <button class="btn" onclick="renderGame(solved)">Auto-Solve</button>
        <hr>
        <h2 id="faults">Wrong attempts: 0</h2>
        <hr>
        <div class="board" id="board"></div>
        <div class="digits" id="digits"></div>
    </section>`;
    }
}

export { PageGameSudoku };