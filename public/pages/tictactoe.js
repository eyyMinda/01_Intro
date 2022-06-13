function pageGameTicTacToe() {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/reset.css">
        <link rel="stylesheet" href="/css/tictactoe.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" />
        <script src="/js/tictactoe.js" type="text/javascript" defer></script>
        <title>Tic Tac Toe</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/tictactoe/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/tictactoe/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/tictactoe/favicon-16x16.png">
        <link rel="manifest" href="/favicon/tictactoe/site.webmanifest">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">
    </head>
    
    <body>
        <main class="background">
            <section class="title">
                <h1>Tic Tac Toe</h1>
            </section>
            <section class="display">
                Player <span class="display-player playerX">X</span>'s turn
            </section>
            <section class="container">
                <div class="tile"></div>
                <div class="tile"></div>
                <div class="tile"></div>
                <div class="tile"></div>
                <div class="tile"></div>
                <div class="tile"></div>
                <div class="tile"></div>
                <div class="tile"></div>
                <div class="tile"></div>
            </section>
            <section class="controls">
                <button id="reset">Reset</button>
            </section>
        </main>
    </body>
    
    </html>`;
}
export { pageGameTicTacToe };