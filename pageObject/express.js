import {  expect } from '@playwright/test';



export class ExpressPage {
    constructor(page) {
        this.page = page;

        this.clickCountryDropdown = page.locator('.css-19bb58m');
        this.selectCountry = page.getByRole('option');
        this.enterAmount = page.getByRole('spinbutton', { name: '5-' });
        this.payButton = page.getByRole('button', { name: 'Pay' });
        this.proceedButton = page.getByRole('button', { name: 'Proceed' });
         this.confirmButton = page.getByRole('button', { name: 'Confirm' });
        this.clickMethods = page.getByText('Use another methods');
        this.securityQuestion = page.locator('div').filter({ hasText: /^Security Question$/ }).nth(2);
        this.answer1 = page.locator('#answer-0');
        this.answer2 = page.locator('#answer-1');
        this.answer3 = page.locator('#answer-2');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.cradNumber = page.locator('iframe[title="Card Number"]').contentFrame().getByRole('textbox', { name: 'Card Number' });
        this.expiryDate = page.locator('iframe[title="Expiration"]').contentFrame().getByRole('textbox', { name: 'Expiration' });
        this.cvv = page.locator('iframe[title="CVV"]').contentFrame().getByRole('textbox', { name: 'CVV' });
        this.payNowButton = page.getByRole('button', { name: 'Pay $' });
        this.closeModule = page.locator('.w-8 > svg');
        this.homePage = page.getByRole('img', { name: 'Logo' });



    }

 async ExpressPayment(amount,NetworkFee,KnowledgeFees,InnovationFees){
    
        await this.countrySelect();
        await this.enterAmount.fill(amount);
        await this.verifyTotalAmount(amount);
        await this.payButton.click();
        await this.verifyReceiveAmount(amount,NetworkFee,KnowledgeFees,InnovationFees);
        await this.proceedButton.click();
        await this.confirmButton.click();
        await this.clickMethods.click();
        await this.securityQuestion.click();
        await this.answer1.fill('Dog');
        await this.answer2.fill('Dhaka');
        await this.answer3.fill('Anan');
        await this.submitButton.click();
        await this.cradNumber.fill('4111111111111111');
        await this.expiryDate.fill('12/34');
        await this.cvv.fill('999');
        await this.payNowButton.click();
        await this.closeModule.click();
        await this.homePage.click();
    }

 



   
    async countrySelect() {
        await this.clickCountryDropdown.click();
        const count = await this.selectCountry.count();
        const randomIndex = Math.floor(Math.random() * count);
        await this.selectCountry.nth(randomIndex).click();

    }
   
    async verifyTotalAmount(amount){

  const exchangeRateText = await this.page.locator("//div[span[text()='Exchange Rate :']]/span[2]").textContent();
  const exchangeRate =  exchangeRateText?.split("≈").at(1)?.match(/\d+(?:\.\d+)?/)?.[0] ?? null;
  const expectedAmount = Number(    (exchangeRate * Number(amount)).toFixed(2));

 const actualAmountText = await this.page.locator("//div[span[normalize-space()='Amount :']]/span[2]").textContent();

const actualAmount = Number(   actualAmountText?.replace(/[^0-9.]/g, ''));

  console.log('Raw Exchange Rate Text:', exchangeRate);
  console.log('Raw expect Amount Text:', expectedAmount);
  console.log('Raw Actual Amount Text:', actualAmount);

  expect(actualAmount).toBeCloseTo(expectedAmount, 2);


    }
    
    async verifyReceiveAmount(amount,NetworkFee,KnowledgeFees,InnovationFees){

   
        const actualFeeText = await this.page.locator("//span[normalize-space()='Fee']/parent::div/following-sibling::span").textContent();
        const actualFee = Number(  actualFeeText?.replace(/[^\d.-]/g, ""));
        const expectedFee = Number( ( NetworkFee + KnowledgeFees + InnovationFees).toFixed(2));

        const receiveAmountText = await this.page.locator("//span[normalize-space()='You Receive']/following-sibling::span ").textContent();
        const receiveAmount = Number (receiveAmountText?.replace(/[^\d.-]/g, ""));
        const expectReceiveAmount = Number(( amount - expectedFee).toFixed(2));

        console.log("Actual Fee:", actualFee);
        console.log("Expected Fee:", expectedFee);
        console.log(" Receive Amount", receiveAmount);
        console.log("Receive", expectReceiveAmount);

expect(actualFee).toBeCloseTo(expectedFee, 2);
expect(expectReceiveAmount).toBeCloseTo(receiveAmount, 2);

    }


    



}