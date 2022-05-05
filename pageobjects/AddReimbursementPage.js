
class AddReimbursementPage
{
    constructor(page)
    {
        this.page = page;
        this.merchangeTextbox = page.locator('#merchant');
        this.categoryDropdown = page.locator('xpath=//span[contains(text(), "Add Category")]//parent::div//input');
        this.amount = page.locator('.select-amount__input-amount ');
        this.requestFormDropdown = page.locator('#team_id');
        this.addMessage = page.locator('#notes');
        this.uploadFile = page.locator('input[type="file"]');
        this.submitButton = page.locator('#addReimbursementSubmit span');
        this.calenderInput = page.locator('.ant-picker-input input');
        this.calenderTodaysDay = page.locator('.ant-picker-cell-today');
    }

    async addReimbursement(amount , merchant , textArea)
    {
        const file = '../dummy.pdf'
        await this.merchangeTextbox.fill(merchant);
        await this.categoryDropdown.click();
        await this.page.locator('//div[text()="Default"]/parent::div').click();
        await this.requestFormDropdown.click();
        await this.page.locator('//div[text()="BEL DEL"]/parent::div').click();
        await this.calenderInput.click();
        await this.calenderTodaysDay.click();
        await this.addMessage.fill(textArea);
        await this.page.setInputFiles('input[type="file"]', file);
        await this.amount.fill(amount);
        await this.delay(3000);
        await this.submitButton.click()
        const finalResponse = await this.page.waitForResponse(response => response.url() === 'https://api.spenmo-staging.com/api/v1/fund/request' && response.status() === 200);
        let responseJson = await finalResponse.json();
        console.log(responseJson.payload.reimbursement_id);
        return responseJson.payload.reimbursement_id;     
  
    }

    delay(time) {
        return new Promise(function(resolve) { 
            setTimeout(resolve, time)
        });
     }
    
}
module.exports = {AddReimbursementPage};
