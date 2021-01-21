import {BasePage} from "./PageObjects/BasePage"
import { Builder, By, Capabilities, until } from "selenium-webdriver"
const page = new BasePage();
//const driver = WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build()
  describe("Login and search", () => {
    //const page = new BasePage(driver)
    //beforeEach(async () => {
      //await page.navigate();
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
      await page.driver.sleep(500)       
      
    });
    })