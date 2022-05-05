const {test} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {RequestsPage} = require('../pageobjects/RequestsPage');
const {AddReimbursementPage} = require('../pageobjects/AddReimbursementPage');
const {SideSectionSlider} = require('../pageobjects/SideSectionSlider');
const {FilterSection} = require('../pageobjects/FilterSection');


const userDataSet = JSON.parse(JSON.stringify(require('../utils/UserData.json')));

test('Validate Reimbursement on slide section and csv' , async ({page})=> {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const requestsPage = new RequestsPage(page);
    const addReimbursementPage = new AddReimbursementPage(page);
    const sideSectionSlider = new SideSectionSlider(page);

    await loginPage.goTo();
    await loginPage.loginUser(userDataSet[0].username , userDataSet[0].password);
    await dashboardPage.selectReimbursementRequestsMenuOption();
    await requestsPage.clickAddReimbursementButton();
    const amount = `${Math.floor((Math.random() * 1000) + 1)}`;
    const merchant = `test${Math.floor((Math.random() * 10000) + 1)}`;
    const textArea = `test${Math.floor((Math.random() * 10000) + 1)}`;
    const id = await addReimbursementPage.addReimbursement(amount , merchant , textArea);
    await requestsPage.clickOnCreatedRow(id);
    await sideSectionSlider.clcikApproveButton(id);
    await requestsPage.clickMyRequests(id);
    await requestsPage.clickOnCreatedRow(id);
    await sideSectionSlider.validateDetailsOnSlideSection(amount,merchant,textArea);
    await sideSectionSlider.closeSlideSection();
    const dataArray = ["reimbursement" , "approved" , "admin" , userDataSet[0].username , amount , textArea];
    const path = await requestsPage.clickDownloadCsvclick();
    await requestsPage.validateDataOnCsv(dataArray , path);

})