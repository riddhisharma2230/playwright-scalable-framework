class LoginPage {

    constructor(page) {
        this.page = page;
        this.username = '#user-name';
        this.password = '#password';
        this.loginButton = '#login-button';
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com/', {
             waitUntil: 'domcontentloaded'
        });
    }

    async login(username, password) {
        await this.page.fill(this.username, username);
        await this.page.fill(this.password, password);
        await this.page.click(this.loginButton);
    }
}

module.exports = LoginPage;
