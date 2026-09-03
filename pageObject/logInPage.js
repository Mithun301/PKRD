
import{ loginData, expect } from '../testData/loginData';

export class LogInPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator("//input[@name='email']");
        this.passwordInput = page.locator("//input[@name='password']");
        this.loginButton = page.locator('//button[@type="submit"]');
        this.errorMessage1 = page.locator("//div[contains(text(), 'No account found with this email address')]");
        this.errorMessage2 = page.locator("//div[contains(text(), 'Invalid password, Please enter valid password')]");

    }

    async loginValid(email= loginData.valid.Email, password= loginData.valid.Password) {
        await this.emailInput.fill(email);
        await this.page.getByRole('button', { name: 'Next' }).click();
        await this.passwordInput.fill(password);
        await this.loginButton.click(); 
     //    await expect(this.page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
        
    }
     async loginInvalidEmail(email= loginData.invalidEmail.Email, password= loginData.invalidEmail.Password) {
        await this.emailInput.fill(email);
        await this.page.getByRole('button', { name: 'Next' }).click();
        // await this.passwordInput.fill(password);
        // await this.loginButton.click(); 
        
    }
    async loginInvalidPassword(email= loginData.invalidPassword.Email, password= loginData.invalidPassword.Password) {
        await this.emailInput.fill(email);
        await this.page.getByRole('button', { name: 'Next' }).click();
        await this.passwordInput.fill(password);
        await this.loginButton.click(); 
        
    }
}