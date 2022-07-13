import { isValid } from '../lib/is-valid/isValid.js'
import { file } from '../lib/file.js';
import { utils } from '../lib/utils.js';
import { ApiResponse } from "../lib/ApiResponse.js";

const handler = {};

handler.account = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];
    if (acceptableMethods.includes(data.httpMethod)) {
        const httpMethodFunc = handler.innerMethods[data.httpMethod];
        return httpMethodFunc(data, callback);
    }
    return callback(405, { msg: 'This method is not acceptable' });
}

handler.innerMethods = {};
////////////////////////////////POST\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
handler.innerMethods.post = async (data, callback) => {
    const { payload } = data;

    const [validErr, validMsg] = utils.objectValidator(payload, {
        required: ["fullname", "email", "pass"],
    });
    if (validErr) return callback(400, ApiResponse.error(validMsg));

    const { fullname, email, pass } = payload;
    const [fullnameErr, fullnameMsg] = isValid.fullname(fullname);
    if (fullnameErr) return callback(400, ApiResponse.error(fullnameMsg));
    const [emailErr, emailMsg] = isValid.email(email);
    if (emailErr) return callback(400, ApiResponse.error(emailMsg));
    const [passErr, passMsg] = isValid.password(pass);
    if (passErr) return callback(400, ApiResponse.error(passMsg));

    const [readErr] = await file.read('accounts', email + '.json');
    if (!readErr) return callback(400, ApiResponse.error('Account already exists'));

    delete payload.pass;
    payload.hashedPassword = utils.hash(pass)[1];
    payload.lastLoginDate = 0;
    payload.registrationDate = Date.now();
    payload.browser = data.user.browser;

    const [createErr] = await file.create('accounts', email + '.json', payload);
    if (createErr) return callback(500, ApiResponse.error('Account was not created due to server problems, try again later'));

    return callback(201, ApiResponse.redirect('/login'));
}
////////////////////////////////GET\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
handler.innerMethods.get = async (data, callback) => {
    const email = data.searchParams.get('email');
    const [emailErr, emailMsg] = isValid.email(email);
    if (emailErr) return callback(400, ApiResponse.error(emailMsg));
    const [readErr, readMsg] = await file.read('accounts', email + '.json');
    if (readErr) return callback(404, ApiResponse.error('This user does not exist or no permissions to view it'));
    const [userErr, userData] = utils.parseJSONtoObject(readMsg);
    if (userErr) return callback(500, ApiResponse.error('Reading user info was unsuccessfull'));
    delete userData.hashedPassword;
    return callback(200, ApiResponse.success(userData));
}
////////////////////////////////PUT\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
handler.innerMethods.put = async (data, callback) => {
    const { payload } = data;
    const email = data.searchParams.get('email');
    const [emailErr, emailMsg] = isValid.email(email);
    if (emailErr) return callback(400, ApiResponse.error(emailMsg));
    const [validErr, validMsg] = utils.objectValidator(payload, { optional: ['fullname', 'pass'] });
    if (validErr) return callback(400, ApiResponse.error(validMsg));

    const { fullname, pass } = payload;
    if (fullname) {
        const [fullnameErr, fullnameMsg] = isValid.fullname(fullname);
        if (fullnameErr) return callback(400, ApiResponse.error(fullnameMsg));
    }
    if (pass) {
        const [passErr, passMsg] = isValid.password(pass);
        if (passErr) return callback(400, ApiResponse.error(passMsg));
    }

    const [readErr, readMsg] = await file.read('accounts', email + '.json');
    if (readErr) return callback(404, ApiResponse.error('This user does not exist or no permissions to view it'));
    const [parseErr, userData] = utils.parseJSONtoObject(readMsg);
    if (parseErr) return callback(500, ApiResponse.error('Failed to update account due to server problems, try again later'));
    if (fullname) userData.fullname = fullname;
    if (pass) userData.hashedPassword = utils.hash(pass)[1];

    const [updateErr] = await file.update('accounts', email + '.json', userData);
    if (updateErr) return callback(500, ApiResponse.error('Failed to update account due to server problems, try again later'));

    return callback(200, ApiResponse.success('Account has been updated'));
}
////////////////////////////////DELETE\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
handler.innerMethods.delete = async (data, callback) => {
    const email = data.searchParams.get('email');
    const [emailErr, emailMsg] = isValid.email(email);
    if (emailErr) return callback(400, ApiResponse.error(emailMsg));
    const [deleteErr] = await file.delete('accounts', email + '.json', userData);
    if (deleteErr) return callback(500, ApiResponse.error('Failed to delete an account due to server problems, try again later'));
    return callback(200, ApiResponse.success('Account has been deleted'));
}

export default handler;