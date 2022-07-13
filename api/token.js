import { file } from "../lib/file.js";
import { isValid } from "../lib/is-valid/isValid.js";
import { utils } from "../lib/utils.js";
import config from "../config.js";
import { ApiResponse } from "../lib/ApiResponse.js";

const handler = {};

handler.token = async (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if (acceptableMethods.includes(data.httpMethod)) {
        const httpMethodFunc = handler._innerMethods[data.httpMethod];
        return await httpMethodFunc(data, callback);
    }
    return callback(405, { msg: 'Your HTTP method request was unaccepted' });
}
handler._innerMethods = {};

////////////////////////////////POST\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
handler._innerMethods.post = async (data, callback) => {
    const { payload } = data;
    ////////Check If Valid Info\\\\\\\\
    const [validErr, validMsg] = utils.objectValidator(payload, { required: ['email', 'pass'], });

    if (validErr) {
        return callback(400, ApiResponse.error(validMsg));
    }

    const { email, pass } = payload;

    const [emailErr, emailMsg] = isValid.email(email);
    if (emailErr) { return callback(400, ApiResponse.error(emailMsg)); }

    const [passErr, passMsg] = isValid.password(pass);
    if (passErr) { return callback(400, ApiResponse.error(passMsg)); }

    ////////Check If Valid Info\\\\\\\\

    const [readErr, readMsg] = await file.read('accounts', email + '.json');
    if (readErr) { return callback(400, ApiResponse.error('Account not found')); }

    const [parseErr, userObject] = utils.parseJSONtoObject(readMsg);
    if (parseErr) { return callback(500, ApiResponse.error('Search failed')); }

    const [hashErr, hashedLoginPass] = utils.hash(pass);
    if (hashErr) { return callback(500, ApiResponse.error('Search failed')); }

    if (hashedLoginPass !== userObject.hashedPassword) {
        return callback(400, ApiResponse.error('Incorrect password'));
    }

    /////////Let Log In\\\\\\\\

    const randomToken = utils.randomString(config.sessionToken.length);
    const tokenObject = {
        email,
        hardDeadline: Math.floor(Date.now() / 1000) + config.sessionToken.hardDeadline,
    }

    const [createErr] = await file.create('token', randomToken + '.json', tokenObject);
    if (createErr) { return callback(500, ApiResponse.error('Unable to assign login session')); }

    const cookies = [
        'login-token=' + randomToken,
        'path=/',
        'domain=localhost',
        'max-age=' + config.sessionToken.hardDeadline,
        'expires=Sun, 16 Jul 3567 06:23:41 GMT',
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly',
    ];

    return callback(200, ApiResponse.redirect('/'), {
        'Set-Cookie': cookies.join('; '),
    });
}

////////////////////////////////GET\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
handler._innerMethods.get = async (data, callback) => {
    return callback(200, { msg: 'Token info..' });
}

////////////////////////////////PUT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
handler._innerMethods.put = async (data, callback) => {
    return callback(200, { msg: 'Token info has been updated' });
}

////////////////////////////////DELETE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
handler._innerMethods.delete = async (data, callback) => {
    return callback(200, { msg: 'Token has been deleted' });
}

////////////////////////////////VERIFY\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
handler._innerMethods.verify = async (tokenStr) => {

    if (typeof tokenStr !== 'string' || tokenStr === '') return false;
    const [cookieErr, cookieMsg] = await file.read('token', tokenStr + '.json');
    if (cookieErr) return false;
    const [cookieParseErr, cookieParseMsg] = utils.parseJSONtoObject(cookieMsg);
    if (cookieParseErr) return false;
    const { hardDeadline } = cookieParseMsg;
    if (typeof hardDeadline !== 'number' || !isFinite(hardDeadline)) return false;
    return hardDeadline * 1000 >= Date.now();
}

export default handler;