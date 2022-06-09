import http from 'http';
import fs from 'fs';
import { file } from './file.js'
import { utils } from './utils.js';
import config from '../config.js';

const server = {};

server.httpServer = http.createServer(async (req, res) => {
    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}/`;
    const parsedURL = new URL(req.url, baseURL);
    const httpMethod = req.method;
    const parsedPathName = parsedURL.pathname;
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, '');   // regex

    /*
    Tekstiniai failai:
        - css
        - js
        - svg
    Binary failai:
        - jpg, png, gif, ico (nuotraukos)
        - woff, eot, ttf (sriftai)
        - audio, video
    API (formos, upload file, t.t.)
    HTML turinys (puslapis)
    */

    const fileExtension = utils.fileExtension(trimmedPath);
    const textFileExtensions = ['css', 'js', 'svg', 'webmanifest', 'txt'];
    const binaryFileExtensions = ['jpg', 'png', 'ico'];
    const isTextFile = textFileExtensions.includes(fileExtension);
    const isBinaryFile = binaryFileExtensions.includes(fileExtension);
    const isAPI = trimmedPath.split('/')[0] === 'api' || baseURL.includes('api')
    // const isAPI = trimmedPath.indexOf('api/') === 0
    const isPage = !isTextFile && !isBinaryFile && !isAPI;


    if (isTextFile) {
        const fileContent = await file.readPublic(trimmedPath)
        res.end(fileContent);
        return;
    }

    if (isBinaryFile) {
        const fileContent = await file.readPublicBinary(trimmedPath)
        res.end(fileContent);
        return;
    }
    if (isAPI) {
        console.log(httpMethod)
        res.end('STAI TAU API...')
        return;
    }
    if (isPage) {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        const fileContent = await file.read('../public' + trimmedPath, 'main.html')
        res.end(fileContent);
        return;
    }
})
server.init = () => {
    server.httpServer.listen(config.httpPort);
    console.log(`http://localhost:${config.httpPort}`)
}

export { server };