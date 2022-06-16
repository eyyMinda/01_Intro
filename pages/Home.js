import { PageTemplate } from "../lib/PageTemplate.js";

class PageHome extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = `┼─The Cycle: Frontier─┼`;
        this.isLoggedIn = data.user.isLoggedIn
    }

    mainHTML() {
        return `<h1>Home Page</h1>`;
    }
}

export { PageHome };