const handler = {};

handler.account = (data, res) => {
    const acceptableMethods = ['get', 'post', 'edit', 'delete'];
    if (acceptableMethods.includes(data.httpMethod)) {
        return handler._account[data.httpMethod](data, res);
    }
    return res.end(JSON.stringify('This method is not acceptable'))
}

handler._account = {};

handler._account.get = (data, res) => {
    return res.end(JSON.stringify('Account: get'));
}
handler._account.post = (data, res) => {
    return res.end(JSON.stringify('Account: post'));
}
handler._account.edit = (data, res) => {
    return res.end(JSON.stringify('Account: edit'));
}
handler._account.delete = (data, res) => {
    return res.end(JSON.stringify('Account: delete'));
}

export default handler;