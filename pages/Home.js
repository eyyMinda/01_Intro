import { PageTemplate } from "../lib/PageTemplate.js";

class PageHome extends PageTemplate {
    constructor() {
        super();
        this.title = `┼─The Cycle: Frontier─┼`;
    }

    mainHTML() {
        return `<h1>Home Page</h1>`;
    }
}

export { PageHome };