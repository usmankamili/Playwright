const {test}  = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');

const userDataSet = JSON.parse(JSON.stringify(require('../utils/UserData.json')));


test('Verify visibility of fund status widgets for Admin user' , async ({page})=> {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goTo();
    await loginPage.loginUser(userDataSet[0].username , userDataSet[0].password);
    await dashboardPage.validateFundStatusWidgetsForAdmin();
})

test('Verify visibility of only available user funds widgets for aisha@bd.com user' , async ({page})=> {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goTo();
    await loginPage.loginUser(userDataSet[1].username , userDataSet[1].password);
    await dashboardPage.validateFundStatusWidgetsForOtherUser();
})