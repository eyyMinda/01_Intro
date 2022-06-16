import { PageTemplate } from "../lib/PageTemplate.js";

class PageLogin extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = `┼─Login─┼`;
        this.css = '<link rel="stylesheet" href="/css/pages/login.css">';
        this.isLoggedIn = data.user.isLoggedIn;
    }

    mainHTML() {
        return `<h1>Login Page</h1>`;
    }
}

export { PageLogin };