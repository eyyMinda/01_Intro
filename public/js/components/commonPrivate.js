console.log('Private sharing is running');

const logoutDOM = document.querySelector('.main-header button');
logoutDOM.addEventListener('click', async () => {
    const res = await fetch('api/token', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    const resBody = await res.json();
    switch (resBody.msgType) {
        case 'redirect': location.href = resBody.href; break;
        default: console.log('Message type not found', resBody.msgType); break;
    }
})