

export class NavigateFeature {
    constructor(page) {
        this.page = page;

        this.expressButton = page.locator('.border > svg').first();
        this.walletButton = page.locator('.space-y-3.flex > .border');
        this.swapButton = page.locator('div:nth-child(3) > .space-y-3 > .border');
        this.p2pButton = page.locator('div:nth-child(4) > .space-y-3 > .border');
        this.merchantButton = page.locator('div:nth-child(5) > .space-y-3 > .border > svg');
        this.redeemButton = page.locator('div:nth-child(6) > .space-y-3 > .border > svg');
    }

    async navigateToExpress() {
        await this.expressButton.click();
    }
    async navigateToWallet() {
        await this.walletButton.click();
    }   
    async navigateToSwap() {
        await this.swapButton.click();
    }
    async navigateToP2P() {
        await this.p2pButton.click();
    }
    async navigateToMerchant() {
        await this.merchantButton.click();
    }

    async navigateToRedeem() {
        await this.redeemButton.click();
    }
}
