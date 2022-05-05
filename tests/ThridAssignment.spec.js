const {test} = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');
const {RequestsPage} = require('../pageobjects/RequestsPage');
const {AddReimbursementPage} = require('../pageobjects/AddReimbursementPage');
const {SideSectionSlider} = require('../pageobjects/SideSectionSlider');
const {FilterSection} = require('../pageobjects/FilterSection');


const userDataSet = JSON.parse(JSON.stringify(require('../utils/UserData.json')));

test('Add Reimbursment, approve and validate' , async ({page})=> {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const requestsPage = new RequestsPage(page);
    const addReimbursementPage = new AddReimbursementPage(page);
    const sideSectionSlider = new SideSectionSlider(page);
    const filterSection = new FilterSection(page);

    await loginPage.goTo();
    await loginPage.loginUser(userDataSet[0].username , userDataSet[0].password);
    await dashboardPage.selectReimbursementRequestsMenuOption();
    await requestsPage.clickAddReimbursementButton();
    const amount = `${Math.floor((Math.random() * 10000) + 1)}`;
    const merchant = `test${Math.floor((Math.random() * 10000) + 1)}`;
    const textArea = `test${Math.floor((Math.random() * 10000) + 1)}`;

    const id = await addReimbursementPage.addReimbursement(amount , merchant , textArea);
    await requestsPage.clickOnCreatedRow(id);
    await sideSectionSlider.clcikApproveButton(id);
    await sideSectionSlider.closeSlideSection();
    await requestsPage.clickFilters();
    await filterSection.applyFilters(amount);
    await requestsPage.validateApprovedStatusForReimbursement(id); 
    await requestsPage.validateTotalRecordsEqualToOneAfterFilter(id); 
})