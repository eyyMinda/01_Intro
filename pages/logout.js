import { PageTemplate } from "../lib/PageTemplate.js";

class PageLogout extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = `┼─Logout─┼`;
        this.css = '<link rel="stylesheet" href="/css/pages/logout.css">';
        this.isLoggedIn = data.user.isLoggedIn;
    }

    mainHTML() {
        const cookies = [
            'login-token=' + this.data.cookies['login-token'],
            'path=/',
            'domain=localhost',
            'max-age=-1000',
            'expires=Sun, 16 Jul 3567 06:23:41 GMT',
            // 'Secure',
            'SameSite=Lax',
            'HttpOnly',
        ];
        this.responseHeaders = {
            'Set-Cookie': cookies.join('; '),
        }

        return `<h1>Logout Page</h1>
        <script>location.href='/';</script>`;
    }
}

export { PageLogout };