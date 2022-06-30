import crypto from 'crypto';
import config from '../config.js';

const utils = {};

utils.hash = (str) => {
    if (typeof str === 'string' && str !== '') {
        const hashedStr = crypto
            .createHmac('sha512', config.hashingSecret)
            .update(str)
            .digest('hex');
        return [false, hashedStr];
    }
    return [true, 'Encoding is not allowed for empty text'];
}

utils.fileExtension = (URL) => {
    return URL.split('.')[1];
}

utils.parseJSONtoObject = (str) => {
    try {
        return [false, JSON.parse(str)];
    } catch (error) {
        return [true, 'ERROR'];
    }
}

utils.objectValidator = (obj, rules) => {
    if (typeof obj !== 'object'
        || obj === null
        || Array.isArray(obj)) {
        return [true, 'Not an object'];
    }

    if (typeof rules !== 'object'
        || rules === null
        || Array.isArray(rules)) {
        return [true, 'Not a structured object'];
    }

    if (!('required' in rules)) {
        rules.required = [];
    }
    if (!('optional' in rules)) {
        rules.optional = [];
    }

    const objKeys = Object.keys(obj);
    const { required, optional } = rules;
    const totalRulesKeys = [...required, ...optional];

    for (const reqKey of required) {
        if (!objKeys.includes(reqKey)) {
            return [true, `Required key is missing - ${reqKey}`];
        }
    }

    for (const objKey of objKeys) {
        if (!totalRulesKeys.includes(objKey)) {
            return [true, `Wrong key or spam - ${objKey}`];
        }
    }

    return [false, 'OK'];
}

export { utils };