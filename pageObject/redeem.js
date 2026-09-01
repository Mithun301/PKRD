import {  expect } from '@playwright/test';

export class RedeemPage {
    constructor(page) {
        this.page = page;   

        this.enterAmount = page.getByRole('spinbutton', { name: 'Enter Amount' }).first()
        this.confirmButton = page.getByRole('button', { name: 'Confirm' })

    }
    async redeemCoin(amount){
        await this.enterAmount.fill(amount);
        await this.verifyAmount(amount);
        await this.confirmButton.click();

    }


async verifyAmount(amount){
  const rateLocator = this.page.locator("//div[p[contains(text(), 'Rate')]]");
  const exchangeRateText = await rateLocator.textContent();
  const exchangeRateMatch = exchangeRateText?.split('~')[1]?.match(/\d+(?:\.\d+)?/);
  const exchangeRate = exchangeRateMatch ? parseFloat(exchangeRateMatch[0]) : 0;

  const actualAmountLocator = this.page.locator("//p[text()='Redeem Fiat Amount']/following-sibling::p");
  const actualAmountText = await actualAmountLocator.textContent();
  const actualAmountValue = parseFloat(actualAmountText?.match(/\d+(?:\.\d+)?/)?.[0] ?? '0');




  const rawConvertedAmount = exchangeRate * amount;
   const expectedFee = 1 + 1 + (amount * 0.01);
   const expectedAmountValue = parseFloat((rawConvertedAmount - expectedFee).toFixed(2));

  
  
  console.log("Parsed Exchange Rate:", exchangeRate);
  console.log("Expected Amount Value:", rawConvertedAmount);
  console.log("Expected Fee:", expectedFee);
   console.log("Expected Amount Value:", expectedAmountValue);
  console.log("Actual Amount Value:", actualAmountValue);


  expect(actualAmountValue).toEqual(expectedAmountValue);
}
}








