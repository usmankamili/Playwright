const { expect } = require('@playwright/test');
const fs = require("fs");

class RequestsPage
{
    constructor(page)
    {
        this.page = page;
        this.addReimbursementButton = page.locator('#actionButton');
        this.reimbursementTable = page.locator('.ant-table-content');
        this.filters = page.locator('span:has-text("Filters")');
        this.myRequests = page.locator('div[role="tab"]');

    }

    async clickAddReimbursementButton()
    {
        this.addReimbursementButton.click();
    }

    async clickOnCreatedRow(id)
    {
        await this.reimbursementTable.waitFor();
        await this.page.locator(`tr[data-row-key="${id}"]`).waitFor();
        await this.page.locator(`tr[data-row-key="${id}"]`).click();
    }

    async validateApprovedStatusForReimbursement(id)
    {   
        await this.page.locator(`tr[data-row-key="${id}"]`).waitFor();
        await expect(this.page.locator(`tr[data-row-key="${id}"]`).locator('.approvals-listing__status')).toHaveText('approved');
    }

    async clickFilters()
    {
        await this.filters.click();
    }

    async validateTotalRecordsEqualToOneAfterFilter(id)
    {
       await expect(this.page.locator(`tr[data-row-key="${id}"]`)).toHaveCount(1);
    }

    async clickMyRequests(id)
    {
        await this.myRequests.last().click();
        await this.page.locator(`tr[data-row-key="${id}"]`).waitFor();
        await this.delay(3000);

    }

    async clickDownloadCsvclick()
    {
        const reliablePath = `download${Math.floor((Math.random() * 10000) + 1)}.csv`;;

        const [ download ] = await Promise.all([
            this.page.waitForEvent('download'), // wait for download to start
            this.page.click('#downloadCSV')
        ]);
        await download.saveAs(reliablePath);
        return reliablePath
    }

    async validateDataOnCsv(dataArray , reliablePath)
    {        
        let base = process.cwd();
        console.log(base);
        var links = fs.readFileSync(`${base}/${reliablePath}`)
        .toString() // convert Buffer to string
        .split('\n') // split string to lines
        .map(e => e.trim()) // remove white spaces for each line
        let data = "";
        let count =0 ;
        for (const link of links) {
            count++;
            if(count === 2)
            {
                data = link;
            }
        }
        var temp = new Array();
        temp = data.split(",");

        await expect(temp[2]).toEqual(dataArray[0]);
        await expect(temp[4]).toEqual(dataArray[1]);
        await expect(temp[6]).toEqual(dataArray[2]);
        await expect(temp[7]).toEqual(dataArray[3]);
        await expect(temp[8]).toEqual(`${dataArray[4]}.00`);
        await expect(temp[10]).toEqual(dataArray[5]);

    }

    delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }
}
module.exports = {RequestsPage};