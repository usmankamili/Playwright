const { expect } = require('@playwright/test');

class SideSectionSlider{
    constructor(page)
    {
        this.page = page;
        this.approveButton = page.locator('span:has-text("Approve")');
        this.requestedBy = page.locator('//h4[text()="Requested by"]/parent::div/p');
        this.merchant = page.locator('//h4[text()="Merchant"]/parent::div/p');
        this.category = page.locator('//h4[text()="Category"]/parent::div/p');
        this.notes = page.locator('//h4[text()="Notes"]/parent::div/p');
        this.amountSg = page.locator('.side-section .table-row-field__title--bold');

    }

    async clcikApproveButton(id)
    {
        await this.approveButton.waitFor();
        await this.approveButton.click();
        await this.page.waitForResponse(response => response.url() === `https://api.spenmo-staging.com/api/v1/fund/request/approve/${id}` && response.status() === 200);
    } 

    async closeSlideSection()
    {
        await this.page.locator('.side-section__close').click();
    }

    async validateDetailsOnSlideSection(amount , merchant , textArea)
    {
        this.requestedBy.waitFor();
        await expect(this.requestedBy).toHaveText('admin');
        await expect(this.merchant).toHaveText(merchant);
        await expect(this.category).toHaveText('Default');
        await expect(this.notes).toHaveText(textArea);
        await expect(this.amountSg.last()).toContainText(amount);
    }

}
module.exports ={SideSectionSlider};