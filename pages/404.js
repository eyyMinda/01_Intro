import { PageTemplate } from "../lib/PageTemplate.js";

class Page404 extends PageTemplate {
    constructor() {
        super();
        this.title = `404 | ┼─The Cycle: Frontier─┼ | 404`
        this.js = `<script src="/js/pages/console_404.js" defer></script>`
    }

    mainHTML() {
        return `<h1>>>> 404 --- Page Not Found <<<</h1>`;
    }
}

export { Page404 };