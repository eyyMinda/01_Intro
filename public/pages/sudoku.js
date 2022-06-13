function pageGameSudoku() {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/reset.css">
        <link rel="stylesheet" href="/css/sudoku.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" />
        <script src="/js/sudoku.js" type="text/javascript" defer></script>
        <script src="/js/sudokuapi.js" type="text/javascript" defer></script>
        <title>Sudoku</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/sudoku/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/sudoku/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/sudoku/favicon-16x16.png">
        <link rel="manifest" href="/favicon/sudoku/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">
    </head>
    
    <body>
        <section class="container">
            <h1>Sudoku</h1>
            <button class="btn" onclick="getNewBoard()">Get New Board</button>
            <button class="btn" onclick="renderGame(solved)">Auto-Solve</button>
            <hr>
            <h2 id="faults">Wrong attempts: 0</h2>
            <hr>
            <div class="board" id="board"></div>
            <div class="digits" id="digits"></div>
        </section>
    </body>
    
    </html>`;
}
export { pageGameSudoku };