import { PageTemplate } from "../lib/PageTemplate.js";
import config from '../config.js';

class PageLogin extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = `┼─Login─┼`;
        this.css = '<link rel="stylesheet" href="/css/pages/auth.css">';
        this.js = '<script src="/js/pages/login.js" type="module" defer></script>';
        this.isLoggedIn = data.user.isLoggedIn;
    }

    mainHTML() {
        const isDev = config.name === 'dev';
        const formValues = {
            email: isDev ? 'ZoeDivision20@rope.round' : '',
            pass: isDev ? 'BaitZoeToSmash69' : '',
        }
        return `<div class="block">
        <div class="header">
            <h2>Login to Account</h2>
        </div>
        <form class="form" action="/api/token" method="POST">
            <div class="notifications"></div>    
            <div class="form-control">
                <label for="email">Email</label>
                <input id="email" name="email" data-validation="email" placeholder="JohnDoe@email.com"
                 type="email" autocomplete="email" required value="${formValues.email}">
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input id="pass" name="pass" data-validation="password" placeholder="yourmom69"
                 type="password" autocomplete="new-password" required value="${formValues.pass}">
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>`;
    }
}

export { PageLogin };