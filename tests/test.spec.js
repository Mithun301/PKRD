import { test, expect } from '@playwright/test';
import { LogInPage } from '../pageObject/logInPage'; 
import { loginData } from '../testData/loginData';
import { NavigateFeature } from '../pageObject/navigateFeature';
import {ExpressPage} from '../pageObject/express';
import {Dashboard} from '../pageObject/dashboard';
import {WalletPage} from '../pageObject/wallet';

const amount = "100";
const NetworkFee = .55;
const KnowledgeFees = .65;
const InnovationFees = amount * 0.015 ;
const walletAddress = "0x9e3640FaFd726D4343428c869F37d802A1b11Ade"; 




test.describe('Log In Tests', () => {
    let login;
    let feature
    let express;
    let dashboard;
    let wallet;
    test.beforeEach(async ({ page }) => {
        login = new LogInPage(page);
        feature = new NavigateFeature(page);
        express = new ExpressPage(page);
        dashboard = new Dashboard(page);
        wallet = new WalletPage(page);

       await page.goto('https://wallet.pkrdcoin.com/login');
         //await page.pause();
    });




 test('Verify  login with Invalid Email', async ({ page }) => {
        
        await login.loginInvalidEmail();
        await expect(login.errorMessage1).toBeVisible();
        
    });


     test('Verify  login with Invalid Password  ', async ({ page }) => {
        
       
        await login.loginInvalidPassword();
        await expect(login.errorMessage2).toBeVisible();
    });


 test('Verify successful login ', async ({ page }) => {

     await login.loginValid();
        await dashboard.viewBalance();
        await dashboard.viewCurrentValue();
        
 });




   test('Verify successful login and navigate to Express', async ({ page }) => {
        
    
       await login.loginValid();
        await expect(page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
        await feature.navigateToExpress();
        await express.countrySelect();
        await express.inputAmount(amount);
        await express.verifyTotalAmount(amount);
        await express.clickPayButton();
        await express.verifyReceiveAmount(amount,NetworkFee,KnowledgeFees,InnovationFees);
        await express.clickProceedButton();
   });

    test('Verify successful login and navigate to Wallet', async ({ page }) => {
        
       
        await login.loginValid();
        await expect(page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
        await feature.navigateToWallet();
        await wallet.sendFunds(walletAddress);
    });

     test('Verify successful login and navigate to Swap', async ({ page }) => {
        
       
        await login.loginValid();
        await expect(page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
        await feature.navigateToSwap();
    });


     test('Verify successful login and navigate to P2P', async ({ page }) => {
        
       
        await login.loginValid();
        await expect(page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
        await feature.navigateToP2P();
    });

     test('Verify successful login and navigate to Merchant', async ({ page }) => {
        
       
        await login.loginValid();
        await expect(page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
        await feature.navigateToMerchant();
    });


     test('Verify successful login and navigate to Redeem', async ({ page }) => {
        
       
        await login.loginValid();
        await expect(page).toHaveURL('https://wallet.pkrdcoin.com/app/dashboard');
        await feature.navigateToRedeem();
    });


    });




