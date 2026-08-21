import {  expect } from '@playwright/test';


export class ExpressPage {
    constructor(page) {
        this.page = page;

        this.clickCountryDropdown = page.locator('.css-19bb58m');
        this.selectCountry = page.getByRole('option');
        this.enterAmount = page.getByRole('spinbutton', { name: '5-' });
        this.payButton = page.getByRole('button', { name: 'Pay' });
        this.proceedButton = page.getByRole('button', { name: 'Proceed' });

    }


    async clickCountryDropdownButton() {
        await this.clickCountryDropdown.click();
    }
    async countrySelect() {
        await this.clickCountryDropdownButton();
        const count = await this.selectCountry.count();
        const randomIndex = Math.floor(Math.random() * count);
        await this.selectCountry.nth(randomIndex).click();
        



        
    }
    async inputAmount(amount) {
        await this.enterAmount.fill(amount);
    }
    async clickPayButton() {
        await this.payButton.click();
    }
    async clickProceedButton() {
        await this.proceedButton.click();
    }   

    async verifyTotalAmount(amount){

  const exchangeRateText = await this.page.locator("//div[span[text()='Exchange Rate :']]/span[2]").textContent();
  const exchangeRate =  exchangeRateText?.split("≈").at(1)?.match(/\d+(?:\.\d+)?/)?.[0] ?? null;
  const expectedAmount = (exchangeRate * amount).toFixed(2);

  const actualAmount = await this.page.locator("//div[span[normalize-space()='Amount :']]/span[2]").textContent();
 // const actualAmount = parseFloat(actualAmountText?.trim() || '2');

  console.log('Raw Exchange Rate Text:', exchangeRate);
  console.log('Raw expect Amount Text:', expectedAmount);
  console.log('Raw Actual Amount Text:', actualAmount);

  expect(actualAmount).toEqual(expectedAmount );


    }
    
    async verifyReceiveAmount(amount){

        const actualFeeText = await this.page.locator("//span[normalize-space()='Fee']/parent::div/following-sibling::span").textContent();
        const actualFee = Number(  actualFeeText?.replace(/[^\d.-]/g, ""));
        const expectedFee = Number( (amount * 0.015 + 0.55 + 0.65).toFixed(2));

        const receiveAmountText = await this.page.locator("//span[normalize-space()='You Receive']/following-sibling::span ").textContent();
        const receiveAmount = Number (receiveAmountText?.replace(/[^\d.-]/g, ""));
        const expectReceiveAmount = Number(( amount - expectedFee).toFixed(2));

        console.log("Actual Fee:", actualFee);
        console.log("Expected Fee:", expectedFee);
        console.log(" Receive Amount", receiveAmount);
        console.log("Receive", expectReceiveAmount);

expect(actualFee).toEqual(expectedFee);
expect(expectReceiveAmount).toEqual(receiveAmount);


    }


}