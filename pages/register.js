import { PageTemplate } from "../lib/PageTemplate.js";

class PageRegister extends PageTemplate {
    constructor() {
        super();
        this.title = `┼─Register─┼`;
        this.css = '<link rel="stylesheet" href="/css/pages/register.css">';
    }

    mainHTML() {
        return `<h1>Register Page</h1>`
    }
}

export { PageRegister };