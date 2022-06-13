function pageGameHangMan() {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/reset.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <script src="/js/HangMan.js" type="text/javascript" defer></script>
        <title>HangMan Game</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/hangman/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/hangman/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/hangman/favicon-16x16.png">
        <link rel="manifest" href="/favicon/hangman/site.webmanifest">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">
    </head>
    
    <body>
    
        <section class="text-center">
            <h1 class="text-danger">Word Guess</h1>
            <div id="lives" class="border border-black p-3 col"></div>
            <div id="answer" class="m-3"></div>
            <div id="wrong" class="m-3"></div>
            <b>
                <div id="tries"></div>
            </b>
        </section>
    
    </body>
    
    </html>`;
}
export { pageGameHangMan };