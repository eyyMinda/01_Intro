import { PageTemplate } from "../lib/PageTemplate.js";

class PageLogin extends PageTemplate {
    constructor() {
        super();
        this.title = `┼─Login─┼`;
        this.css = '<link rel="stylesheet" href="/css/pages/login.css">';
    }

    mainHTML() {
        return `<h1>Login Page</h1>`;
    }
}

export { PageLogin };