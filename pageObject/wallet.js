

export class WalletPage {
    constructor(page) {
        this.page = page;   

        this.inputWalletAddress = page.locator("//input[@name='toAddress']");
        this.clickContinueButton = page.locator("//button[@type='submit']");
        this.inputAmount = page.locator("//input[@name='amount' and @inputmode='decimal']");
        this.clickSendButton = page.getByRole('button', { name: 'Send' }).nth(1);
    }

    async sendFunds(walletAddress) {
        await this.inputWalletAddress.fill(walletAddress);
        await this.clickContinueButton.click();
        await this.inputAmount.fill('10');
        await this.clickSendButton.click();
        
    }
}