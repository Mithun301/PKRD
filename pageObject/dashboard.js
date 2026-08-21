

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



}
