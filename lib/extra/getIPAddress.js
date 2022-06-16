import { networkInterfaces } from 'os';

const IP = {};

IP.getIP = (data) => {
    const nets = data();
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
            if (net.family === familyV4Value && !net.internal) {
                if (!IP[name]) {
                    IP[name] = [];
                }
                IP[name].push(net.address);
            }
        }
    }
    return IP.Ethernet
}

export { IP };