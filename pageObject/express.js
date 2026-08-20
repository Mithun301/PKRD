

export class ExpressPage {
    constructor(page) {
        this.page = page;

        this.clickCountryDropdown = page.locator('.css-19bb58m');
        this.selectCountry = page.locator("(//div[@id='react-select-2-listbox']//div[@role='option'])");
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
    


}