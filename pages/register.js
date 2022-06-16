import { PageTemplate } from "../lib/PageTemplate.js";

class PageRegister extends PageTemplate {
    constructor(data) {
        super(data);
        this.title = `┼─Register─┼`;
        this.css = '<link rel="stylesheet" href="/css/pages/register.css">';
        this.js = 'register'
        this.isLoggedIn = data.user.isLoggedIn;
    }

    mainHTML() {
        return `
        <div class="row">
            <h1>Register</h1>
            <p>Register or leave</p>
            <form class="form" action="/api/account" method="POST">
                
            <label for="fullname">Fullname</label>
                <input id="fullname" name="fullname" placeholder="John Doe" type="text" autocomplete="name" required>

                <label for="email">Email</label>
                <input id="email" name="email" placeholder="JohnDoe@email.com"type="email" autocomplete="email" required>
                
                <label for="password">Password</label>
                <input id="pass" name="pass" placeholder="yourmom69"type="password" autocomplete="new-password" required>
                
                <label for="repass">Repeat password</label>
                <input id="repass" name="repass" placeholder="yourmom69"type="password" autocomplete="new-password" required>
                
                <span><input type="checkbox" id="tos" required>
                <label for="tos">Agree to terms and service conditions</label></span>

                <button type="submit">Register</button>
            </form>
        </div>`
    }
}

export { PageRegister };