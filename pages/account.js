import { PageTemplate } from "../lib/PageTemplate.js";

class PageAccount extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = `┼─Account─┼`;
        this.css = '<link rel="stylesheet" href="/css/pages/account.css">';
        this.isLoggedIn = data.user.isLoggedIn;
    }

    mainHTML() {
        return `<h1>Account Page</h1>`;
    }
}

export { PageAccount };