const config = {};

config.dev = {
    name: 'dev',
    httpPort: 6969,
    passwordLength: 2,
    defaultLanguage: 'en',
    languages: ['en', 'lt', 'ee'],
    db: {
        user: 'root',
        password: 'admin',
        database: 'batai',
    },
    cache: {
        default: 0,
        period: {},
    }
}

config.prod = {
    name: 'prod',
    httpPort: 65535,
    passwordLength: 12,
    defaultLanguage: 'lt',
    languages: ['en', 'lt'],
    db: {
        user: 'node_batai_user',
        password: 'r84tr5s25e84rrg52f5er84r5ert8r4g55e',
        database: 'batai-r5fe1d15',
    },
    cache: {
        default: 60 * 60,
        period: {
            css: 60 * 60,
            js: 60 * 60 * 6,
            svg: 60 * 60 * 12,
            png: 60 * 60 * 24,
            jpg: 60 * 60 * 24,
            ico: 60 * 60 * 24,
            woff2: 60 * 60 * 24,
            woff: 60 * 60 * 24,
            ttf: 60 * 60 * 24,
            otf: 60 * 60 * 24,
            eot: 60 * 60 * 24,
            webmanifest: 60 * 60 * 24,
            pdf: 60 * 60 * 24,
            json: 60 * 60 * 24,
        },
    }
}

const nodeEnv = process.env.NODE_ENV;
const env = nodeEnv ? nodeEnv : 'dev';
const options = config[env] ? config[env] : config.dev;

export default options;