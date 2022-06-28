import { isValid } from '../lib/is-valid/isValid.js'
const handler = {};

handler.account = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if (acceptableMethods.includes(data.httpMethod)) {
        const httpMethodFunc = handler._innerMethods[data.httpMethod];
        return httpMethodFunc(data, callback);
    }
    return callback(405, { msg: 'This method is not acceptable'});
}

handler.innerMethods = {};

handler.innerMethods.get = (data, callback) => {
    return callback(200, { msg: 'Account: get'});
}
handler.innerMethods.post = (data, callback) => {
    const { payload } = data;
    const { fullname, email, pass } = payload;
    const allowedKeys = ['fullname', 'email', 'pass'];
    const keys = Object.keys(payload);
    if (keys.length > allowedKeys.length) {
        let deniedKeys = [];
        for (const key of keys) {
            if (!allowedKeys.includes(key)) deniedKeys.push(key);
        }
        return callback(400, {msg:`Only 'fullname', 'email' and 'pass' is allowed to be posted. Denied keys: ${deniedKeys}`})
    }

    const [fullnameErr, fullnameMsg] = isValid.fullname(fullname);
    if (fullnameErr) return callback(400, {msg:fullnameMsg});
    const [emailErr, emailMsg] = isValid.email(email);
    if (emailErr) return callback(400, {msg: emailMsg});
    const [passErr, passMsg] = isValid.password(pass);
    if (passErr) return callback(400, {msg:passMsg});

    return callback(200, { msg:'Account: post'});
}
handler.innerMethods.put = (data, res) => {
    return callback(200, { msg:'Account: put'});
}
handler.innerMethods.delete = (data, res) => {
    return callback(200, { msg:'Account: delete'});
}

export default handler;