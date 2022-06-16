import { PageTemplate } from "../lib/PageTemplate.js";

class PageLogout extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = `┼─Logout─┼`;
        this.css = '<link rel="stylesheet" href="/css/pages/logout.css">';
        this.isLoggedIn = data.user.isLoggedIn;
    }

    mainHTML() {
        return `<h1>Logout Page</h1>`;
    }
}

export { PageLogout };