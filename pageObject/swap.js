import {  expect } from '@playwright/test';

export class SwapPage {
    constructor(page) {
        this.page = page;   

        this.enteramount = page.locator('#fromAmount');
        this.swapButton = page.getByRole('button', { name: 'Swap' });
        this.confirmButton = page.getByRole('button', { name: 'Confirm' });

    }
     
    async swapCoin(amount,NetworkFee,KnowledgeFees,InnovationFees){ 
     
        await this.enteramount.fill(amount);
        await this.verifyTotalAmount(amount,NetworkFee,KnowledgeFees,InnovationFees);
        await this.swapButton.click();
        await this.confirmButton.click();
    }

    async verifyTotalAmount(amount,NetworkFee,KnowledgeFees,InnovationFees){

  const exchangeRateText = await this.page.locator("//div[p[text()='Rate: ']]").textContent();
  const exchangeRate =  exchangeRateText?.split("=").at(1)?.match(/\d+(?:\.\d+)?/)?.[0] ?? null;
  const expectedAmount = (exchangeRate * amount).toFixed(2);
  const expectedFee = Number( ( NetworkFee + KnowledgeFees + InnovationFees).toFixed(2));
  const expectedAmountValue = (expectedAmount - expectedFee).toFixed(1);
  const actualAmount = await this.page.locator("//div[span[text()='Amount (USDT)']]").textContent();
  const actualAmountValue = parseFloat(actualAmount?.trim().replace(/[^0-9.]/g, '') || '0');


        console.log("exchange rate:", exchangeRate);
        console.log("Expected Fee:", expectedFee);
        console.log("Expected Amount Value:", expectedAmountValue);
        console.log("Actual Amount Value:", actualAmountValue);


  expect(actualAmountValue).toEqual(parseFloat(expectedAmountValue));

        

    }


}