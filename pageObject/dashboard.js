import {  expect } from '@playwright/test';




export class Dashboard {
    constructor(page) {
   
        this.page = page;

        this.hideIcon = this.page.locator('.flex.justify-start > span > svg').first();
        this.value = this.page.getByRole('heading', { name: '****', exact: true }).locator('svg');




    }
    async viewBalance(){
        await this.hideIcon.click();
    }
    async viewCurrentValue(){
        await this.value.click();
    }
  
    async getValue() {
        
        const valueLocator = this.page.locator("//h1[contains(text(),'Est. Total Value')]/following-sibling::h2");
        const rawText = await valueLocator.textContent();
        const currentValue = parseFloat(rawText.replace(/[^0-9.]/g, ''));

       console.log(" Start Value:", currentValue);
       return currentValue;


}
        async getCurrentValueAfterExpress() {

        const valueLocator = this.page.locator("//h1[contains(text(),'Est. Total Value')]/following-sibling::h2");
        const rawText = await valueLocator.textContent();
        const currentValue = parseFloat(rawText.replace(/[^0-9.]/g, ''));
       console.log("After Express Value:", currentValue);
       return currentValue;

        }


        async verifyBalanceAfterExpress(amount,NetworkFee,KnowledgeFees,InnovationFees, initialValue) {

        const expectedFee = Number( ( NetworkFee + KnowledgeFees + InnovationFees).toFixed(2));
        const expressAmount = Number(( amount - expectedFee).toFixed(2));
         console.log("Expected Value:", expressAmount);

         const actualAfterValue = await this.getCurrentValueAfterExpress();
         const expectedValue = Number((initialValue + expressAmount).toFixed(2));

     

         expect(actualAfterValue).toBeCloseTo(expectedValue, 2);


     


}
}

