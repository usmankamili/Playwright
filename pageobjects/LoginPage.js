
class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.userName =  page.locator('#login_email');
        this.password = page.locator('#login_password');
        this.loginButton = page.locator('#loginBtn');
        this.userDashboard = page.locator('.dashboard__user');
    }

    async goTo()
    {
        await this.page.goto('https://dashboard.spenmo-staging.com/login');
    }

    async loginUser(username , passWord)
    {
        await this.userName.fill(username);
        await this.password.fill(passWord);
        await this.loginButton.click();
        await this.userDashboard.waitFor();
    }

    
}
module.exports = {LoginPage};