import { test, expect } from '@playwright/test';
import { LogInPage } from '../pageObject/logInPage'; 
import { loginData } from '../testData/loginData';
import { NavigateFeature } from '../pageObject/navigateFeature';
import {ExpressPage} from '../pageObject/express';

const amount = '100';


test.describe('Log In Tests', () => {
    let login;
    let feature;
    let express;
    test.beforeEach(async ({ page }) => {
        login = new LogInPage(page);
        feature = new NavigateFeature(page);
        express = new ExpressPage(page);

       await page.goto('https://wallet.pkrdcoin.com/login');
         await page.pause();
    });
//  test('Verify  login with Invalid Email', async ({ page }) => {
        
//         await login.loginInvalidEmail();
//         await expect(login.errorMessage1).toBeVisible();
        
//     });
//      test('Verify  login with Invalid Password  ', async ({ page }) => {
        
       
//         await login.loginInvalidPassword();
//         await expect(login.errorMessage2).toBeVisible();
        
        
//     });



    test('Verify successful login and navigate to Express', async ({ page }) => {
        
    
        await login.loginValid();
        await expect(page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
        await feature.navigateToExpress();
        await express.countrySelect();
        await express.inputAmount(amount);
        await express.clickPayButton();
        await express.clickProceedButton();
    });

    // test('Verify successful login and navigate to Wallet', async ({ page }) => {
        
       
    //     await login.loginValid();
    //     await expect(page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
    //     await feature.navigateToWallet();
    // });

    //  test('Verify successful login and navigate to Swap', async ({ page }) => {
        
       
    //     await login.loginValid();
    //     await expect(page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
    //     await feature.navigateToSwap();
    // });
    //  test('Verify successful login and navigate to P2P', async ({ page }) => {
        
       
    //     await login.loginValid();
    //     await expect(page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
    //     await feature.navigateToP2P();
    // });
    //  test('Verify successful login and navigate to Merchant', async ({ page }) => {
        
       
    //     await login.loginValid();
    //     await expect(page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
    //     await feature.navigateToMerchant();
    // });


    //  test('Verify successful login and navigate to Redeem', async ({ page }) => {
        
       
    //     await login.loginValid();
    //     await expect(page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
    //     await feature.navigateToRedeem();
    // });


    });




