import http from 'http';
import { file } from './file.js'
import { utils } from './utils.js';
import config from '../config.js';

import { page404 } from '../public/pages/404.js';
import { pageHome } from '../public/pages/home.js';
import { pageLogin } from '../public/pages/login.js';
import { pageRegister } from '../public/pages/register.js';
import { pageGameSudoku } from '../public/pages/sudoku.js';
import { pageGameHangMan } from '../public/pages/hangman.js';
import { pageGameTicTacToe } from '../public/pages/tictactoe.js';

const server = {};

server.httpServer = http.createServer(async (req, res) => {
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}/`;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method;
    const parsedPathName = parsedURL.pathname;
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');   // regex

    const fileExtension = utils.fileExtension(trimmedPath);
    const textFileExtensions = ['css', 'js', 'svg', 'webmanifest', 'txt'];
    const binaryFileExtensions = ['jpg', 'png', 'ico'];
    const isTextFile = textFileExtensions.includes(fileExtension);
    const isBinaryFile = binaryFileExtensions.includes(fileExtension);
    const isAPI = trimmedPath.split('/')[0] === 'api' || baseURL.includes('api')
    // const isAPI = trimmedPath.indexOf('api/') === 0
    const isPage = !isTextFile && !isBinaryFile && !isAPI;
    const maxAge = config.cache.period[fileExtension] ?? config.cache.default

    const mimes = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        svg: 'image/svg+hml',
        png: 'image/png',
        jpg: 'image/jpeg',
        ico: 'image/x-icon',
        woff2: 'font/woff2',
        woff: 'font/woff',
        ttf: 'font/ttf',
        otf: 'font/otf',
        eot: 'aplication',
        webmanifest: 'application/manifest+json',
        pdf: 'application/json',
        json: 'application/json'
    };
    let responseContent = '';

    if (isTextFile) {
        responseContent = await file.readPublic(trimmedPath)
        if (responseContent === false) { res.writeHead(404); }
        else {
            res.writeHead(200, {
                'Content-Type': mimes[fileExtension],
                'Cache-Control': `max-age=${maxAge}`,
            });
        }
    }

    if (isBinaryFile) {
        responseContent = await file.readPublicBinary(trimmedPath)
        if (responseContent === false) { res.writeHead(404); }
        else {
            res.writeHead(200, {
                'Content-Type': mimes[fileExtension] || mimes.html,
                'Cache-Control': `max-age=${maxAge}`,
            });
        }
    }

    if (isAPI) {
        console.log(httpMethod)
        res.writeHead(503, { 'Content-Type': mimes.json });
        return res.end('STAI TAU API...');
    }

    if (isPage) {
        res.writeHead(404)
        let pageFunction = server.routes[404];
        if (trimmedPath in server.routes) {
            res.writeHead(200, { 'Content-Type': mimes.html })
            pageFunction = server.routes[trimmedPath];
        }
        responseContent = pageFunction()
    }
    return res.end(responseContent);
})

server.routes = {
    '': pageHome,
    '404': page404,
    'register': pageRegister,
    'login': pageLogin,
    'games/sudoku': pageGameSudoku,
    'games/tictactoe': pageGameTicTacToe,
    'games/hangman': pageGameHangMan,
}

server.init = () => {
    server.httpServer.listen(config.httpPort);
    console.log(`http://localhost:${config.httpPort}`)
}

export { server };