

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
  
    async getCurrentValue() {
        await this.value.click();
        const valueLocator = this.page.locator("//h1[contains(text(),'Est. Total Value')]/following-sibling::h2");

    const rawText = await valueLocator.textContent();
    const currentValue = parseFloat(rawText.replace(/[^0-9.]/g, ''));

    console.log("Current Value:", currentValue);
    return currentValue;


}
}

