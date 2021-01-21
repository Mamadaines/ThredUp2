
import {BasePage} from "./PageObjects/BasePage";
import { Builder, By, Capabilities, until } from "selenium-webdriver"

const fs = require("fs");
const page = new BasePage();
  describe("Login, search and add to cart", () => {
   // const page = new BasePage({ browser: "chrome" });
    //afterAll(async () => {
     //page.driver.quit();
    //});
    afterAll(async () => {
      page.driver.quit();
    });

    test('ThredUP login', async () => {
      // await page.driver.get(page.url)
      // await page.clickAndEnter(page.email, "george@gmail.com");
       // clicks start shopping button
       //await page.click(page.startShopping);
       //await page.click(page.addPassword);
       //await page.clickAndEnter(page.setPassword, "456789")
       //await page.driver.sleep(1000)
       //await page.click(page.submit)
       //await page.driver.sleep(5000)
       await (await page.driver).get('https://www.thredup.com/')
       //await page.driver.sleep(500)
       let button = await (await page.driver).findElement(By.xpath('(//button[@aria-label="close"])[2]'))
       await button.click()
       
     });

    test('Search for Dresses', async () => {
      await page.clickAndEnter(page.searchBar, "dresses\n")
      await page.driver.sleep(5000)
      let button = await (await page.driver).findElement(By.css('[class="ui-link u-uppercase u-tracking-wide"]'))
      await button.click()
      await page.driver.sleep(500)
      await page.takeScreenshot("Dress results")
      await page.driver.sleep(5000)
    });
   
    test('Add dress to cart', async () => {
        //await page.click(page.Results)
        let button = await (await page.driver).findElement(By.xpath('//a[text()= "Erika Dresses Size Lg"]'))
        await button.click()
        await page.driver.sleep(5000)
        await page.click(page.addtoCart)
        await page.click(page.viewCart)
        await page.driver.sleep(5000)
        await page.takeScreenshot("view cart")
        await page.driver.sleep(500)
        });
      });