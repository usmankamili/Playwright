class FilterSection{

    constructor(page)
    {
        this.page = page;
        this.selectStatus = page.locator('//span[text()="Select Status"]/parent::div//input');
        this.selectType = page.locator('//span[text()="Select Type"]/parent::div//input');
        this.minAmount = page.locator('#min_amount');
        this.maxAmount = page.locator('#max_amount');
        this.applyButton = page.locator('//span[text()="Apply"]');
    }

    async applyFilters(amount)
    {
        //await this.delay(4000);
        await this.selectStatus.click();
        await this.page.locator('//p[text()="Approved"]').click();
        await this.selectType.click();
        await this.page.locator('//p[text()="Reimbursement"]').click();
        await this.minAmount.fill(amount);
        await this.maxAmount.fill(amount);
        this.applyButton.click();
        await this.page.waitForResponse(response => response.url() === `https://api.spenmo-staging.com/api/v1/fund/request/list` && response.status() === 200);
        await this.page.locator('.dot').waitFor();    
    }

    delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }
}
module.exports = {FilterSection};