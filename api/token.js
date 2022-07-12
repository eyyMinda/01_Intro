import { file } from "../lib/file.js";
import { isValid } from "../lib/is-valid/isValid.js";
import { utils } from "../lib/utils.js";

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

    if (validErr) { return callback(400, { msg: validMsg, }); }

    const { email, pass } = payload;

    const [emailErr, emailMsg] = isValid.email(email);
    if (emailErr) { return callback(400, { msg: emailMsg, }); }

    const [passErr, passMsg] = isValid.password(pass);
    if (passErr) { return callback(400, { msg: passMsg, }); }

    ////////Check If Valid Info\\\\\\\\

    const [readErr, readMsg] = await file.read('accounts', email + '.json');
    if (readErr) { return callback(400, { msg: 'Account not found', }); }

    const [parseErr, userObject] = utils.parseJSONtoObject(readMsg);
    if (parseErr) { return callback(500, { msg: 'Search failed', }); }

    const [hashErr, hashedLoginPass] = utils.hash(pass);
    if (hashErr) { return callback(500, { msg: 'Search failed', }); }

    if (hashedLoginPass !== userObject.hashedPassword) {
        return callback(400, { msg: 'Incorrect password', });
    }

    console.log(readMsg);
    console.log(userObject);
    console.log(hashedLoginPass);
    console.log(userObject.hashedPassword);

    /////////Let Log In\\\\\\\\

    const randomToken = utils.randomString(config.sessionToken.length);
    const tokenObject = {
        email,
        hardDeadline: Math.floor(Date.now() / 1000) + config.sessionToken.hardDeadline,
    }

    const [createErr] = await file.create('token', randomToken + '.json', tokenObject);
    if (createErr) { return callback(500, { msg: 'Unable to assign login session', }); }

    const cookies = [
        'login-token=' + randomToken,
        'path=/',
        'domain=localhost',
        'max-age=' + tokenObject.hardDeadline,
        'expires=Sun, 16 Jul 3567 06:23:41 GMT',
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly',
    ];

    return callback(200, { msg: 'Token created successfully', }, {
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

export default handler;