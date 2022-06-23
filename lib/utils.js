const utils = {};

utils.fileExtension = (URL) => {
    return URL.split('.')[1];
}

utils.parseJSONToObject = (str) => {
    try {
        return [false, JSON.parse(str)];
    } catch (e) {
        return [true, 'Failed To Parse JSON'];
    }
}

export { utils };