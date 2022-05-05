const { expect } = require('@playwright/test');
class DashboardPage{
    constructor(page){
        this.page = page;
        this.expenseThisMonthWidget = page.locator('span:has-text("Expenses This Month")');
        this.allottedTeamFundWidget = page.locator('span:has-text("Allotted Team Fund")');
        this.availableTeamFundsWidget = page.locator('span:has-text("Available Team Funds")');
        this.availableUserFundsWidget = page.locator('span:has-text("Available User Funds")');
        this.menuToggle = page.locator('.sidebar-logo');
        this.reimbursementRequestsMenuOption = page.locator('span:has-text("Reimbursement & Requests")');
        this.pageHeader = page.locator('.recursive-table__container__header h1');
    }


    async validateFundStatusWidgetsForAdmin()
    {
        await expect(this.expenseThisMonthWidget).toBeVisible();
        await expect(this.allottedTeamFundWidget).toBeVisible();
        await expect(this.availableTeamFundsWidget).toBeVisible();
        await expect(this.availableUserFundsWidget).toBeVisible();
    }

    async validateFundStatusWidgetsForOtherUser()
    {
        await expect(this.expenseThisMonthWidget).toBeHidden();
        await expect(this.allottedTeamFundWidget).toBeHidden();
        await expect(this.availableTeamFundsWidget).toBeHidden();
        await expect(this.availableUserFundsWidget).toBeVisible();
    }

    async selectReimbursementRequestsMenuOption()
    {
        await this.menuToggle.click();
        await this.reimbursementRequestsMenuOption.click();
        await this.pageHeader.waitFor();
    }
}
module.exports = {DashboardPage};