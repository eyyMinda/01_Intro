import http from 'http';
import { file } from './file.js'
import { utils } from './utils.js';
import config from '../config.js';
import { router } from "./router.js";

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
    const dataForHandlers = {
        baseURL,
        trimmedPath,
        httpMethod,
        user: {
            isLoggedIn: false,
            username: '',
            email: '',
            browser: '',
            ipaddress: '',
        }
    }

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
        res.writeHead(200, { 'Content-Type': mimes.html })
        const pageClass = router.getRoute(dataForHandlers);
        const pageObj = new pageClass(dataForHandlers);
        responseContent = pageObj.render();
    }
    return res.end(responseContent);
})

server.init = () => {
    server.httpServer.listen(config.httpPort);
    console.log(`Server is running at http://localhost:${config.httpPort}`)
}

export { server };