import { isValid } from '../lib/is-valid/isValid.js'
const handler = {};

handler.account = (data, res) => {
    const acceptableMethods = ['get', 'post', 'edit', 'delete'];
    if (acceptableMethods.includes(data.httpMethod)) {
        return handler.innerMethods[data.httpMethod](data, res);
    }
    return res.end(JSON.stringify('This method is not acceptable'))
}

handler.innerMethods = {};

handler.innerMethods.get = (data, res) => {
    return res.end(JSON.stringify('Account: get'));
}
handler.innerMethods.post = (data, res) => {
    const { payload } = data;
    const { fullname, email, pass } = payload;
    const allowedKeys = ['fullname', 'email', 'pass'];
    const keys = Object.keys(payload);
    if (keys.length > allowedKeys.length) {
        let deniedKeys = [];
        for (const key of keys) {
            if (!allowedKeys.includes(key)) deniedKeys.push(key);
        }
        return res.end(`Only 'fullname', 'email' and 'pass' is allowed to be posted. Denied keys: ${deniedKeys}`)
    }

    const [fullnameErr, fullnameMsg] = isValid.fullname(fullname);
    if (fullnameErr) return res.end(JSON.stringify(fullnameMsg));
    const [emailErr, emailMsg] = isValid.email(email);
    if (emailErr) return res.end(JSON.stringify(emailMsg));
    const [passErr, passMsg] = isValid.password(pass);
    if (passErr) return res.end(JSON.stringify(passMsg));

    return res.end(JSON.stringify('Account: post'));
}
handler.innerMethods.edit = (data, res) => {
    return res.end(JSON.stringify('Account: edit'));
}
handler.innerMethods.delete = (data, res) => {
    return res.end(JSON.stringify('Account: delete'));
}

export default handler;