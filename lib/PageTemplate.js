import fs from 'fs';

class PageTemplate {
    constructor(data) {
        this.data = data;
        this.title = `┼─Server─┼`
        this.content = `<h1>Template Page</h1>`;
        this.cssReset = `<link rel="stylesheet" href="/css/reset.css">`
        this.css = '<link rel="stylesheet" href="/css/pages/home.css">';
        this.js = '';
        this.privOrPubJS = '';
        this.meta = '';
        this.favicon = `<link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon">
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
        <link rel="manifest" href="/favicon/site.webmanifest">
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff"></meta>`;
        this.responseHeaders = {};
    }

    headHTML() {
        return `<meta charset="UTF-8">
        <meta name="description" content="The Cycle Frontier">
        <meta name="keywords" content="HTML, CSS, JavaScript, NodeJS, Programming">
        <meta name="author" content="Mindaugas Straksys">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${this.title}</title>
        ${this.favicon}
        ${this.css}
        ${this.js}
        `
    }

    headerHTML() {
        let regLogIn = `<a href="/register">Register</a>
                        <a href="/login">Login</a>`
        if (this.data.user.isLoggedIn) regLogIn = `<a href="/account">Account</a>
                                        <button type="button" class="btn">Logout</button>`;

        return `<header class="container">
                    <div class="row main-header">
                        <img src="/img/logo.png" alt="Logo" style="width: 300px; height: 100px;">
                        <nav>
                            <a href="http://localhost:6969/games/hangman">HangMan</a>
                            <a href="http://localhost:6969/games/tictactoe">TicTacToe</a>
                            <a href="http://localhost:6969/games/sudoku">Sudoku</a>
                        </nav>
                        <nav>
                            <a href="/">Home</a>
                            <a href="/404">404</a>
                            ${regLogIn}
                        </nav>
                    </div>
                </header>`;
    }
    mainHTML() {
        return `<div class="row">MAIN CONTENT</div>`;
    }
    footerHTML() {
        const createdDate = fs.statSync('lib/server.js').birthtime.toISOString().slice(0, 4);
        const currentDate = (new Date()).getFullYear();
        const displayDate = currentDate > createdDate ? `${createdDate}&nbsp-&nbsp${currentDate}` : `${createdDate}`
        return `<footer class="container">
                    <div class="row main-footer">
                        &copy;${displayDate}&nbsp;-&nbsp;<a href="https://github.com/eyyMinda" target="_blank">Mindaugas</a>
                    </div>
                </footer>`;
    }

    scriptHTML() {
        const { isLoggedIn } = this.data.user;
        let HTML = '';
        const scriptTag = (path) => `<script src="/js/${path}.js" type="module" defer></script>`;

        HTML += isLoggedIn ? scriptTag(`components/commonPrivate`) : scriptTag(`components/commonPublic`);
        if (this.privOrPubJS !== '') { HTML += scriptTag(`pages/${this.privOrPubJS}`); }

        return HTML;
    }

    render() {
        return [`<!DOCTYPE html>
        <html lang="en">
        <head>
            ${this.headHTML()}
        </head>
        <body>
            ${this.headerHTML()}
            <main>${this.mainHTML()}</main><br>
            ${this.footerHTML()}
            ${this.scriptHTML()}
        </body>
        </html>`, this.responseHeaders];
    }
}

export { PageTemplate };