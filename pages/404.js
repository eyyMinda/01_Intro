import { PageTemplate } from "../lib/PageTemplate.js";

class Page404 extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = `404 | ┼─The Cycle: Frontier─┼ | 404`
        this.js = `<script src="/js/pages/console_404.js" defer></script>`
        this.isLoggedIn = data.user.isLoggedIn;
    }

    mainHTML() {
        return `<h1>>>> 404 --- Page Not Found <<<</h1>`;
    }
}

export { Page404 };