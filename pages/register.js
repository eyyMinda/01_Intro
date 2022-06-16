import { PageTemplate } from "../lib/PageTemplate.js";

class PageRegister extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = `┼─Register─┼`;
        this.css = '<link rel="stylesheet" href="/css/pages/register.css">';
        this.isLoggedIn = data.user.isLoggedIn;
    }

    mainHTML() {
        return `<h1>Register Page</h1>`
    }
}

export { PageRegister };